import React from "react";
import PropTypes from "prop-types";
import DescriptionField from "../fields/DescriptionField.js";
import {View, Text} from 'react-native';
import {Checkbox} from 'react-native-material-design';


function CheckboxWidget(props) {
    const {
        schema,
        id,
        value,
        required,
        disabled,
        readonly,
        label,
        autofocus,
        onChange,
    } = props;
    return (
        <View>
            {schema.description &&
            <DescriptionField description={schema.description}/>}
            <View>
                <Checkbox
                    id={id}
                    checked={typeof value === "undefined" ? false : value}
                    required={required}
                    disabled={disabled || readonly}
                    autoFocus={autofocus}
                    onChange={event => onChange(event.target.checked)}
                />
                <Text>
                    {label}
                </Text>
            </View>
        </View>
    );
}

CheckboxWidget.defaultProps = {
    autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
    CheckboxWidget.propTypes = {
        schema: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        value: PropTypes.bool,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        autofocus: PropTypes.bool,
        onChange: PropTypes.func,
    };
}

export default CheckboxWidget;
