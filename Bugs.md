### Saucedemo.com – Bug List

- **No quantity update on cart**
  - **Short Steps**: Add any product → Go to cart page
  - **Expected Behavior**: Should allow quantity change
  - **Actual Behavior**: Only "Remove" option shown
  - **Severity Tag**: **Functionality Issue**

- **No confirmation on add/remove**
  - **Short Steps**: Add or remove product from cart
  - **Expected Behavior**: Show toast/confirmation
  - **Actual Behavior**: No feedback or confirmation
  - **Severity Tag**: **Usability Issue**

- **Inconsistent button state after navigation**
  - **Short Steps**: Add product → Navigate back → Revisit product
  - **Expected Behavior**: Button remains "Remove"
  - **Actual Behavior**: Button resets to "Add to cart"
  - **Severity Tag**: **Functionality Issue**

- **Cart badge delay**
  - **Short Steps**: Quickly add/remove products
  - **Expected Behavior**: Cart badge updates instantly
  - **Actual Behavior**: Badge updates delayed
  - **Severity Tag**: **UI Issue**

- **Menu overlaps content**
  - **Short Steps**: Open burger menu on inventory page
  - **Expected Behavior**: Menu should push content properly
  - **Actual Behavior**: Menu overlaps content awkwardly
  - **Severity Tag**: **UI Issue**

- **Sorting errors**
  - **Short Steps**: Sort products by name or price
  - **Expected Behavior**: Correct stable order
  - **Actual Behavior**: Sorting flickers or incorrect
  - **Severity Tag**: **Functionality Issue**

- **Reset App State not full reset**
  - **Short Steps**: Add items → Use Reset App State option
  - **Expected Behavior**: Cart and buttons fully reset
  - **Actual Behavior**: Cart clears but buttons stuck at "Remove"
  - **Severity Tag**: **Functionality Issue**

- **Password masking flaw**
  - **Short Steps**: Enter password → Try copying
  - **Expected Behavior**: Copying should be blocked
  - **Actual Behavior**: Can copy masked password
  - **Severity Tag**: **Usability Issue**

- **Visual Regression: Hidden elements still clickable**
  - **Short Steps**: Open menu → Close menu → Click previous menu area
  - **Expected Behavior**: Hidden menu should be unclickable
  - **Actual Behavior**: Invisible menu still clickable
  - **Severity Tag**: **UI Issue**


