import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";

/**
 * @name MultipleSelectDropdown
 *
 * @description Displays a non-editable text input that when tapped, opens a dropdown
 * menu that allows the user to select from a preset list of options.
 *
 * Usage:
 *
 * ```js
 * <DropdownList
 *    selected={selected}
 *    options={["1","2","3"]}
 *    setSelected={handleDropdownSelection}
 * />
 * ````
 *
 * @param {String[]} selectedValues - REQUIRED - Selected values of the dropdown options.
 * @param {String[]} options - REQUIRED - The array of options to be displayed in the dropdown menu.
 * @param {Function} onSelectionsUpdate - REQUIRED - Function to be called whenever the selected items array is updated. Passed function should update the selectedValues prop.
 * @param {Number} menuHeight - Specifies the height of the dropdown menu if required.
 * @param {String} label - Label to be displayed to designate to the user what is being selected.
 * @param {Object} expandedContainerStyle - The style to be applied to the entire container when the menu is open.
 * @param {Object} retractedContainerStyle - The style to be applied to the entire container when the menu is closed.
 * @param {Object} inputStyle - The style to be applied to the input box.
 * @param {Object} dropdownStyle - The style to be applied to the dropdown menu.
 * @param {Object} dropdownItemStyle - The style to be applied to each item in the dropdown menu.
 * @param {Object} dropdownTextStyle - The style to be applied to the text in the dropdown menu items.
 * @param {String} textAlign - The alignment of the text within the input and menu.
 * @param {Object} placeholderTextStyle - The style to be applied to the placeholder text when no options are selected.
 * @param {Boolean} labelShown - Whether or not to display the label. Defaults to true.
 * @param {Object} labelStyle - The style to be applied to the label if shown.
 * @param {Object} selectedItemStyle - The style to be applied to the array of selected items in the input box.
 * @param {Object} selectedItemTextStyle - The style to be applied to the text in the selected items.
 * @param {String} removeIconColor - Color of the removal icon button.
 *
 * @augments Component
 *
 * @author Chad Rice - 2024
 */
function MultipleSelectDropdown({
  selectedValues = [],
  options = [],
  onSelectionsUpdate = () => {},
  menuHeight = 200,
  label = "",
  expandedContainerStyle = {},
  retractedContainerStyle = {},
  inputStyle = {},
  dropdownStyle = {},
  dropdownItemStyle = {},
  dropdownTextStyle = {},
  textAlign = "center",
  placeholderTextStyle = {},
  labelShown = true,
  labelStyle = {},
  selectedItemStyle = {},
  selectedItemTextStyle = {},
  removeIconColor = "#000",
}) {
  /**
   * Reference value to track the animation of the dropdown menu.
   */
  const animatedvalue = useRef(new Animated.Value(0)).current;

  /**
   * State variable on whether or not the dropdown menu is showing.
   */
  const [dropdownVisible, setDropdownVisible] = useState(false);

  /**
  *  State cariable holding the array of selected options. 
  */
  const [selections, setSelections] = useState(selectedValues ?? []);

  /**
  * Listen for updates to the selectedValues prop and update the state. 
  */
  useEffect(() => {
    setSelections(selectedValues);
  }, [selectedValues]);

  /**
   * Animates the opening of the dropdown menu.
   */
  const slidedown = () => {
    setDropdownVisible(true);
    Animated.timing(animatedvalue, {
      toValue: menuHeight,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  /**
   * Animates the closing of the dropdown menu.
   */
  const slideup = () => {
    Animated.timing(animatedvalue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setDropdownVisible(false));
  };

  /**
  * Removes the selected option and calls the onSelectionsUpdate function prop with the updated selections.
  * 
  * @param {String} selection - Selection to be Removed.
  */
  function handleRemoveOption(selection) {
    onSelectionsUpdate(selections.filter((item) => item !== selection));
  }

  /**
  * Adds the selected option to the selections array (or removes it if it is already included) 
  * and calls the onSelectionsUpdate function prop with the updated selections.
  * 
  * @param {String} selection - Selection to be Removed.
  */
  function handleOptionPress(option) {
    onSelectionsUpdate(
      selections.includes(option)
        ? selections.filter((item) => item !== option)
        : [...selections, option]
    );
  }

  /**
  * Toggles the dropdown menu display.
  */
  function handleInputPress() {
    dropdownVisible ? slideup() : slidedown();
  }

  return (
    <View
      style={[
        styles.container,
        dropdownVisible ? expandedContainerStyle : retractedContainerStyle,
      ]}
    >
      {labelShown && label !== "" && label !== null && label !== undefined && (
        <Text style={[styles.labelText, labelStyle]}>{label}</Text>
      )}
      <TouchableWithoutFeedback
        style={[styles.wrapper, inputStyle]}
        onPress={handleInputPress}
      >
        <View>
          <ScrollView
            horizontal={true}
            style={[styles.inputBoxScrollView, inputStyle]}
            contentContainerStyle={styles.inputBoxScrollContent}
            nestedScrollEnabled={true}
            scrollEnabled={true}
          >
            <TouchableWithoutFeedback onPress={handleInputPress}>
              <View style={{ flexDirection: "row" }}>
                {selections.map((selection, index) => {
                  return (
                    <View
                      key={index}
                      style={[
                        styles.selectedOptionDefault,
                        selectedItemStyle,
                        styles.selectedOptionRequired,
                      ]}
                    >
                      <Text
                        style={[
                          styles.selectedOptionText,
                          selectedItemTextStyle,
                        ]}
                      >
                        {selection}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleRemoveOption(selection)}
                      >
                        <Icon
                          name="close-outline"
                          size={20}
                          color={removeIconColor}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
                {selections.length == 0 && (
                  <Text
                    style={[styles.placeholderText, placeholderTextStyle]}
                  >{`Select ${label}`}</Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>

      {dropdownVisible && (
        <Animated.View style={[{ maxHeight: animatedvalue }]}>
          <View
            style={[
              styles.dropdownDefault,
              dropdownStyle,
              styles.dropdownRequired,
            ]}
          >
            <ScrollView
              contentContainerStyle={styles.dropdownScrollContentContainer}
              nestedScrollEnabled={true}
            >
              {options.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      handleOptionPress(item);
                    }}
                  >
                    <View style={[styles.option, dropdownItemStyle]}>
                      <Text
                        style={[
                          styles.dropdownItemText,
                          dropdownTextStyle,
                          { textAlign: textAlign },
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

MultipleSelectDropdown.propTypes = {
  /** The array of option strings to be displayed in the dropdown menu. */
  options: PropTypes.arrayOf(PropTypes.string).isRequired,

  /**
   * Function to be called whenever the selected items array is updated. Passed function should update the selectedValues prop.
   *
   * Example:
   * ```js
   * onSelectionsUpdate={(selections)=>{
   *    setSelections(selections);
   *    //Do something else...
   * }}
   * ````
   */
  onSelectionsUpdate: PropTypes.func.isRequired,

  /** Array of selected options. */
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,

  /** Specifies the height of the dropdown menu if required. */
  menuHeight: PropTypes.number,

  /** Label to be displayed to designate to the user what is being selected. */
  label: PropTypes.string,

  /** The style to be applied to the entire container when the menu is open. */
  expandedContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),

  /** The style to be applied to the entire container when the menu is closed. */
  retractedContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),

  /** The style to be applied to the input box. */
  inputStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),

  /** The style applied to the label if shown */
  labelStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),

  /** The style to be applied to the dropdown menu. */
  dropdownStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),

  /** The style to be applied to each item in the dropdown menu. */
  dropdownItemStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),

  /** The style to be applied to the text in the dropdown menu items. */
  dropdownTextStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),

  /** The style to be applied to the selected item shown in the input box. */
  selectedItemStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),

  /** The style to be applied to the selected item shown in the input box. */
  selectedItemTextStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),

  /** The alignment of the text within the menu. */
  textAlign: PropTypes.string,

  /** The style to be applied to the placeholder text when no options are selected. */
  placeholderTextStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),

  /** Whether or not to display the label above the inputBox. Defaults to true. */
  labelShown: PropTypes.bool,

  /** Color of the icon displayed on the selected item component to show user the removal option. */
  removeIconColor: PropTypes.string,
};

export default MultipleSelectDropdown;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dropdownItemText: {
    color: "#FFF",
  },
  inputBoxScrollContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  inputBoxScrollView: {
    width: "100%",
    padding: 5,
    minHeight: 45,
  },
  labelText: {
    color: "#FFF",
  },
  placeholderText: {
    color: "#999",
  },
  wrapper: {
    justifyContent: "space-between",
  },
  dropdownDefault: {
    borderColor: "#000",
    borderRadius: 5,
    borderWidth: 1,
  },
  dropdownRequired: {
    width: "100%",
    overflow: "hidden",
  },
  dropdownScrollContentContainer: {
    paddingVertical: 10,
    overflow: "hidden",
  },
  option: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    overflow: "hidden",
  },
  selectedOptionDefault: {
    backgroundColor: "#999",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 5,
  },
  selectedOptionRequired: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedOptionText: {
    marginRight: 5,
    color: "#000",
  },
});
