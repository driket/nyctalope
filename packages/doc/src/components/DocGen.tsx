import React, { useContext } from 'react';
import {
  ColorScheme,
  Fonts,
  ThemeContext,
  ColorSchemeType,
} from '@nyctalope/core';

export const DocGen = (props) => {
  const { componentMetadata } = props;
  const { colors } = useContext(ThemeContext);
  return (
    <div>
      {componentMetadata && (
        <div>
          <table>
            <thead>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
            </thead>
            <tbody>
              {componentMetadata.childrenComponentProp &&
                componentMetadata.childrenComponentProp.map((prop) => {
                  return (
                    <tr>
                      <td>{prop.name}</td>
                      <td style={{ color: colors.grey }}>
                        {prop.flowType ? prop.flowType.name : ''}
                        {prop.flowType && prop.flowType.raw
                          ? ` (${prop.flowType.raw})`
                          : ''}
                      </td>
                      <td style={{ color: colors.grey }}>
                        {prop.defaultValue ? prop.defaultValue.value : ''}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <p>{componentMetadata.docblock}</p>
        </div>
      )}
    </div>
  );
};
