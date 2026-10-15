# Contact table & board

Built by **Hadi Risha** · [Live demo](https://contact-board.vercel.app/) · [Source](https://github.com/hadi-risha/contact-board.git)

A prototype for the Alpha frontend design engineer assignment. Ten fictional contacts, shown as a table or as a board (Lead, Prospect, Qualified, Customer), and editable from either view through one details panel.

Stack: Vite, React, TypeScript, Tailwind CSS. Mock data and local state only.


## Run it

```bash
npm install
npm run dev
```

## What's in it

- Table and board views of the same data, with a switch at the top.
- Click a row or card to open a details panel and edit Stage and Notes. Save and Cancel stay disabled until something changes.
- Saving a stage moves the card to its new column and updates the table row.
- Drag a card to another column (optional).
- The Customer column is empty on purpose, and some contacts have missing company, role, owner or labels.
- Keyboard: focus moves into the panel when it opens and back to the row or card when it closes. Esc closes it.
- Below 1280px the panel overlays the page instead of sitting beside it.

## How I approached it

I kept one contacts array in a reducer, and both views just render from it, so they can't drift apart. The panel only stores the fields you've changed and reads the rest from the live record, so it never shows stale data, for example after a drag on the board.

Table rows show the fields you scan by (name, company, role, email, owner, labels, stage). Cards are lighter: name, role and company, labels, owner. Notes only appear in the panel, because free text would break the row and card density.

## Trade-offs

- Closing with unsaved changes uses `window.confirm`. It's quick and accessible, but not pretty.
- The panel isn't modal, so the page behind stays usable, but on narrow screens it covers content.
- Drag and drop uses native HTML5 events, so there's no touch support. Keyboard users change the stage in the panel.

## What I'd do next

- Search and filters by owner and label.
- A keyboard way to move cards between stages.
- Component tests for save, cancel and switching views.

## What I owned

I designed the layout and state model and built the interface. I used AI assistance for scaffolding and iteration, and I reviewed and tested the result myself.