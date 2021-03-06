import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from 'react-native';
import {
  orderProperties,
  retrieveSchema,
  getDefaultRegistry,
} from "../../utils";

class ObjectField extends Component {
  static defaultProps = {
    uiSchema: {},
    formData: {},
    errorSchema: {},
    idSchema: {},
    required: false,
    disabled: false,
    readonly: false,
  };

  isRequired(name) {
    const schema = this.props.schema;
    return (
      Array.isArray(schema.required) && schema.required.indexOf(name) !== -1
    );
  }

  onPropertyChange = name => {
    return (value, options) => {
      const newFormData = { ...this.props.formData, [name]: value };
      this.props.onChange(newFormData, options);
    };
  };

  render() {
    
    const {
      uiSchema,
      formData,
      errorSchema,
      idSchema,
      name,
      required,
      disabled,
      readonly,
      onBlur,
      registry = getDefaultRegistry(),
    } = this.props;
    const { definitions, fields, formContext } = registry;
    const { SchemaField, TitleField, DescriptionField } = fields;
    const schema = retrieveSchema(this.props.schema, definitions);
    const title = schema.title === undefined ? name : schema.title;
    let orderedProperties;

    try {
      const properties = Object.keys(schema.properties);
      orderedProperties = orderProperties(properties, uiSchema["ui:order"]);
    } catch (err) {
      return (
        <View>
          <View style={{ color: "red" }}>
            <Text> 
              Invalid {name || "root"} object field configuration:
            </Text>
            <Text>{err.message}</Text>.
          </View>
          <Text>
            {JSON.stringify(schema)}
          </Text>
        </View>
      );
    }
    return (
      <View>
        {(uiSchema["ui:title"] || title) &&
          <TitleField
            id={`${idSchema.$id}__title`}
            title={title || uiSchema["ui:title"]}
            required={required}
            formContext={formContext}
          />
          }
        {(uiSchema["ui:description"] || schema.description) &&
          <DescriptionField
            id={`${idSchema.$id}__description`}
            description={uiSchema["ui:description"] || schema.description}
            formContext={formContext}
          />}
        {orderedProperties.map((name, index) => {
          return (
            <SchemaField
              key={index}
              name={name}
              required={this.isRequired(name)}
              schema={schema.properties[name]}
              uiSchema={uiSchema[name]}
              errorSchema={errorSchema[name]}
              idSchema={idSchema[name]}
              formData={formData[name]}
              onChange={this.onPropertyChange(name)}
              onBlur={onBlur}
              registry={registry}
              disabled={disabled}
              readonly={readonly}
            />
          );
        })}
      </View>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  ObjectField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    errorSchema: PropTypes.object,
    idSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.object,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object])
      ).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired,
      formContext: PropTypes.object.isRequired,
    }),
  };
}

export default ObjectField;
