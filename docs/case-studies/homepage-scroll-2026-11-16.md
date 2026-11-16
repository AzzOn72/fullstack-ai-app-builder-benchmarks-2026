# A quieter canvas: reducing scroll-time work without removing the design

Uvilno's homepage combines a product film, a photographic depth card and decorative canvas particles. The page could load, then hesitate when a visitor first scrolled down to the film and photograph. That made initial-load measurements an incomplete description of the experience.

This is an account of our own implementation and browser measurements. It is not a comparison with another builder, a field Core Web Vitals report, or a guarantee about a physical device.

## Measure the transition that feels slow

We profiled the first scroll through the media section in fresh Chromium contexts, using four-times CPU throttling. The harness moved through sixteen scroll steps, then observed another 2.1 seconds. It counted element geometry reads and text-range reads, collected long tasks and frame intervals, and checked that the video and photograph became usable.

The desktop baseline made 21,466 calls to `getBoundingClientRect` during that window. The decorative background needed to avoid drawing over readable text and controls. Its protection logic repeatedly walked the document and measured content that was far outside the viewport.

Those reads had a purpose. Removing the text protection would have changed the design and made the interface harder to read. We changed when the work happened instead.

## Keep an index, then measure the visible entries

The revised reader keeps an index of text-bearing elements and interactive controls. Content changes invalidate that index. An `IntersectionObserver` tracks which indexed elements are near the viewport, so a scroll can measure the relevant entries without traversing the entire page again.

Controls need their complete box protected, including icon-only buttons. Ordinary text needs its actual line fragments. There is an awkward exception: an element using `display: contents` has readable descendants but no useful layout box of its own. Those descendants must remain measurable rather than disappearing from the index.

We also copied rectangle coordinates into plain numeric objects once. The particle loop repeatedly tests those coordinates. It does not need to repeatedly access the browser's native rectangle getters for every particle and mask combination.

An important correctness detail survives the optimization: a scroll still clears particles from the current text and projected photograph area immediately. Cached geometry should never become an excuse to paint decoration over newly exposed content.

## Prepare the first frame and yield during the gesture

The photograph uses two small depth layers and cached particle sprites. We start preparing the layers before the card enters view, retain the complete original image if decoding fails, and rasterize sprites in short animation-frame batches. The visible drawing path then uses prepared sprites.

The card also reuses its measured bounds, adjusting for scroll position instead of reading its layout on every scroll frame. Resize, initial font settlement and intersection updates still refresh the geometry where needed.

Both decorative canvases now yield while scrolling is active and resume after a 120 ms quiet window. Text protection remains current while drawing waits. First automatic video playback uses the same short quiet window so decoder startup does not compete with the first gesture. Explicit Play remains immediate, and playback that was already requested keeps its existing visibility behavior.

The cursor's code fragments had a separate problem: too many bursts during ordinary movement. A shared one-second cooldown now applies to mouse movement and touch gestures. Starting a new touch no longer resets that cooldown.

## Keep the result narrower than the evidence

| Desktop cold-scroll metric      | Before |  After |
| ------------------------------- | -----: | -----: |
| Element geometry reads          | 21,466 |  3,353 |
| Time beyond 50 ms in long tasks | 636 ms | 304 ms |
| Longest task                    | 322 ms | 220 ms |
| Frame interval, 95th percentile |  67 ms |  67 ms |

These are single lab samples. They support a substantial reduction in geometry work and blocking in this transition. They do not establish a universal frame-rate improvement: the reported frame percentile did not change. The cold window can also contain unfinished React startup work, so it should not be described as an isolated canvas microbenchmark.

We checked the other side of the tradeoff too. All six public JavaScript bundle budgets passed. The local candidate's decoded initial script size increased by about 0.15%; there were no new dependencies or media assets. Video retained `preload="none"`, and the homepage heading and canonical URL stayed the same.

Interaction checks covered both themes, widths from 320 to 2048 pixels, native touch scrolling, keyboard activation, reduced motion, offscreen suspension, video controls and asset failures. A quieter animation is useful only if the controls and fallback states still work.

For a similar investigation, record first visibility separately from initial loading. Count the reads that happen during the gesture, prepare expensive first frames in bounded pieces, and verify the content masks after changing the scheduling. Preserve the measurements that did not improve as carefully as the ones that did.

The interface discussed here is [Uvilno's live homepage](https://uvilno.com/#walkthrough). Its product film is labelled an illustrative walkthrough; it is not footage of a newly qualified customer build.

_Disclosure: this article was prepared with AI assistance for Uvilno. It describes Uvilno's own code changes and recorded browser checks from 16 November 2026. No customer results, field SEO gains or competitor measurements are claimed._

