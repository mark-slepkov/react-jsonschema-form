import React from "react";
import PropTypes from "prop-types";
import {TextInput, Platform, View} from 'react-native'

const IS_ANDROID = Platform.OS === 'android';

const styles = {
  container: {
    marginTop: 2,
    marginBottom: 10,
  },
  textInputWrapper: {
    height: 42,
    marginBottom: 2,
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    color: 'white',
    margin: IS_ANDROID ? -1 : 0,
    height: 42,
    padding: 7,
  }
};

function BaseInput(props) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  const {
    value,
    readonly,
    disabled,
    autofocus,
    onBlur,
    options,
    schema,
    formContext,
    registry,
    ...inputProps
  } = props;

  inputProps.type = options.inputType || inputProps.type || "text";
  const _onChange = ({ target: { value } }) => {
    return props.onChange(value === "" ? options.emptyValue : value);
  };
  return (
      <View style={styles.container}>
        <View style={[styles.textInputWrapper]}>
          <TextInput
            ref={(ref) => this.textInputRef = ref}
            readOnly={readonly}
            disabled={disabled}
            style={[styles.textInput]}
            autoFocus={autofocus}
            value={value === null ? "" : value}
            {...inputProps}
            onChangeText={_onChange}
            onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}
          />
        </View>
      </View>
  );
}

BaseInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };
}

export default BaseInput;
