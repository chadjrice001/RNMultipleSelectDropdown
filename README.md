# RNMultipleSelectDropdown
React Native Dropdown Menu with Multiple Selection Capabilities

# RNMultipleSelectDropdown

The MultipleSelectDropdown component is a highly customizable React Native component that displays a non-editable input box. When tapped, it opens a dropdown menu allowing users to select multiple options. The selected options are shown within the input box, which is horizontally scrollable. The component also includes icons to remove selected options.

# Table of Contents

Installation

Usage

Props

Example

License

# Installation

To use the MultipleSelectDropdown component in your React Native project, follow these steps:

Clone the repository:

```bash
git clone https://github.com/your-username/multiple-select-dropdown.git
```
Navigate to the component's directory:

```bash
cd multiple-select-dropdown
```
Install dependencies:

```bash
npm install
```
Install peer dependencies (if any):

```bash
npm install react-native-vector-icons
```
Link native dependencies:

```bash
react-native link react-native-vector-icons
```
Copy the component to your project or use it directly from this repository.

# Usage

To use the MultipleSelectDropdown component, import it into your React Native project and include it in your component tree.

```js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MultipleSelectDropdown from '[...path-to-multiple-select-dropdown]/MultipleSelectDropdown';

const App = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectionsUpdate = (updatedSelections) => {
    setSelectedOptions(updatedSelections);
  };

  return (
    <View style={styles.container}>
      <MultipleSelectDropdown
        options={['Option 1', 'Option 2', 'Option 3']}
        selectedValues={selectedOptions}
        onSelectionsUpdate={handleSelectionsUpdate}
        placeholder="Select options..."
        label="Options"
        menuHeight={200}
        inputStyle={styles.input}
        dropdownStyle={styles.dropdown}
        dropdownItemStyle={styles.dropdownItem}
        dropdownTextStyle={styles.dropdownText}
        selectedItemStyle={styles.selectedItem}
        selectedItemTextStyle={styles.selectedItemText}
        removeIconColor="#FF0000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    color: '#000',
  },
  selectedItem: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  selectedItemText: {
    marginRight: 5,
    color: '#000',
  },
});

export default App;
```

# Props

The MultipleSelectDropdown component accepts the following props:

**selectedValues** (Array<string>): The array of currently selected options.

**options** (Array<string>): The array of options to display in the dropdown menu.

**onSelectionsUpdate** (Function): Callback function called when the selected options are updated.

**menuHeight** (Number): The height of the dropdown menu (default is 200).

**label** (String): Label to display above the input box.

**expandedContainerStyle** (Object): Styles for the container when the dropdown is open.

**retractedContainerStyle** (Object): Styles for the container when the dropdown is closed.

**inputStyle** (Object): Styles for the input box.

**dropdownStyle** (Object): Styles for the dropdown menu.

**dropdownItemStyle** (Object): Styles for each item in the dropdown menu.

**dropdownTextStyle** (Object): Styles for the text in the dropdown menu items.

**textAlign** (String): Text alignment in the input and dropdown menu (default is "center").

**placeholderTextStyle** (Object): Styles for the placeholder text.

**labelShown** (Boolean): Whether to display the label (default is true).

**labelStyle** (Object): Styles for the label.

**selectedItemStyle** (Object): Styles for selected items in the input box.

**selectedItemTextStyle** (Object): Styles for the text of selected items.

**removeIconColor** (String): Color of the remove icon.


# Example

Here is an example of how to use the MultipleSelectDropdown component:

```js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MultipleSelectDropdown from 'path-to-multiple-select-dropdown/MultipleSelectDropdown';

const Example = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectionsUpdate = (updatedSelections) => {
    setSelectedOptions(updatedSelections);
  };

  return (
    <View style={styles.container}>
      <MultipleSelectDropdown
        options={['Apple', 'Banana', 'Cherry']}
        selectedValues={selectedOptions}
        onSelectionsUpdate={handleSelectionsUpdate}
        placeholder="Select fruits..."
        label="Fruits"
        inputStyle={styles.input}
        dropdownStyle={styles.dropdown}
        dropdownItemStyle={styles.dropdownItem}
        dropdownTextStyle={styles.dropdownText}
        selectedItemStyle={styles.selectedItem}
        selectedItemTextStyle={styles.selectedItemText}
        removeIconColor="#FF0000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    color: '#000',
  },
  selectedItem: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  selectedItemText: {
    marginRight: 5,
    color: '#000',
  },
});

export default Example;
```

# License

This component is licensed under the MIT License. See the LICENSE file for details.

