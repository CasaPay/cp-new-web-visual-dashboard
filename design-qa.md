# Design QA — Location Search Heading Capitalization

- Source visual truth: `/var/folders/nr/drsyt3ys09zccjfskndf29m00000gp/T/TemporaryItems/NSIRD_screencaptureui_xneZ0F/Screenshot 2026-09-03 at 10.37.58.png`
- Implementation screenshot: `/Users/risto/Documents/ChatGPT/CP-Web-V2/audits/capitalization-fix-2026-09-03/after.png`
- Route and state: `/tenant?capitalization-qa=1`, search focused with `d` entered
- Source pixels: 1310 × 1784
- Implementation pixels / CSS viewport: 1442 × 1044 at device scale factor 1
- Normalization: focused comparison of the search dropdown; no layout measurements were inferred across the different full-page crops

**Findings**

- No remaining P0, P1, or P2 findings. The filtered group headings now read `Cities` and `Universities` in title case.

**Required fidelity surfaces**

- Fonts and typography: existing family, size, weight, line height, wrapping, and hierarchy are unchanged; only capitalization changed.
- Spacing and layout rhythm: unchanged; the corrected strings occupy the same dropdown heading slots without overflow.
- Colors and visual tokens: unchanged.
- Image quality and asset fidelity: unaffected by this change.
- Copy and content: corrected from `cities` / `universities` to `Cities` / `Universities` while preserving `Popular Cities` / `Popular Universities` in the initial state.

**Comparison history**

- Earlier finding: typed search changed the group labels to lowercase `cities` and `universities`.
- Fix: centralized the labels as title-cased `Cities` and `Universities` for both popular and filtered states.
- Post-fix evidence: the implementation screenshot and browser accessibility tree both show `Cities` and `Universities` after entering `d`.

**Focused comparison evidence**

- A focused dropdown comparison was sufficient because the requested change affects only two text labels. The hero, input, dropdown geometry, results, icons, colors, and surrounding page were intentionally preserved.

**Implementation checklist**

- [x] Capitalize filtered city heading.
- [x] Capitalize filtered university heading.
- [x] Preserve popular-state wording.
- [x] Verify the typed-search interaction in the browser.

final result: passed
