/** @jsx jsx */
import FeatherIcon from 'feather-icons-react';
import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { jsx, css } from '@emotion/core';
import { ThemeContext } from '@nyctalope/core';
import { CSSProperties } from '@emotion/serialize';
import { PropertiesFallback } from 'csstype';

export const ComponentsMenuItems = (props) => {
  const { colors, fonts } = useContext(ThemeContext);
  const { components } = props;
  const categorizedComponents = categorizeComponents(components);
  console.log(categorizedComponents);
  const topLevelStyle = {
    marginLeft: '26px',
    fontSize: '11px',
    color: colors.grey,
    letterSpacing: '0.15em',
    fontFamily: fonts.heading,
    marginTop: '28px',
    marginBottom: '10px',
  };
  const baseMenuStyle = {
    fontFamily: fonts.main,
  };
  const menuStyle = {
    ...props.style,
    ...baseMenuStyle,
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
  };
  const corePages = categorizedComponents.filter(
    (category) => category.name == 'style',
  );
  const layoutPages = categorizedComponents.filter(
    (category) => category.name == 'layout',
  );
  const componentsPages = categorizedComponents.filter(
    (category) =>
      category.name == 'elements' ||
      category.name == 'data-viz' ||
      category.name == 'document',
  );
  const experimentalPages = categorizedComponents.filter(
    (category) => category.name == 'experimental',
  );
  return (
    <div style={menuStyle}>
      <h3 style={topLevelStyle}>CORE</h3>
      {corePages.map((category) => {
        return (
          <MenuCategory
            key={category.id}
            icon={category.icon}
            name={category.name}
            components={category.components}
          />
        );
      })}
      <h3 style={topLevelStyle}>BASE</h3>
      {layoutPages.map((category) => {
        return (
          <MenuCategory
            key={category.id}
            icon={category.icon}
            name={category.name}
            components={category.components}
          />
        );
      })}
      <h3 style={topLevelStyle}>COMPONENTS</h3>
      {componentsPages.map((category) => {
        return (
          <MenuCategory
            key={category.id}
            icon={category.icon}
            name={category.name}
            components={category.components}
          />
        );
      })}
      <h3 style={topLevelStyle}>PLAYGROUND</h3>
      {experimentalPages.map((category) => {
        return (
          <MenuCategory
            key={category.id}
            icon={category.icon}
            name={category.name}
            components={category.components}
          />
        );
      })}
    </div>
  );
};

const MenuCategory = (props) => {
  const { colors, fonts } = useContext(ThemeContext);
  const icon = props.icon || 'cube';
  const name = props.name || '';
  const components = props.components || [];
  return (
    <ul
      style={{
        paddingLeft: '20px',
        fontFamily: fonts.heading,
      }}
    >
      <li
        key={name}
        css={css`
          font-family: ${fonts.main};
          min-height: 26px;
          list-style: none;
          padding-left: 0px;
          display: flex;
          flex-direction: row;
          align-items: center;
          /* width: 150px; */
          clear: both;
          text-transform: capitalize;
          margin-left: 0px;
          margin-bottom: 0px;
          font-size: 13px;
          color: ${colors.main};
        `}
      >
        <FeatherIcon
          icon={icon}
          css={css`
            margin-right: 2px;
            height: 14px;
          `}
        />
        {name}
      </li>
      <ul
        css={css`
          padding-left: 26px;
        `}
      >
        {components.map((component) => {
          return (
            <li
              key={component.name}
              css={css`
                list-style: none;
                margin: 0;
                min-height: 20px;
                /* display: flex; */
                flex-direction: row;
                align-items: center;
                font-size: 13px;
                /* width: 200px; */
                clear: both;
              `}
            >
              <Link
                style={{ color: colors.grey, textDecoration: 'none' }}
                to={component.slug}
              >
                {component.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </ul>
  );
};

const iconForCategory = (category) => {
  switch (category) {
    case 'data-viz':
      return 'pie-chart';
    case 'layout':
      return 'layout';
    case 'document':
      return 'file';
    case 'style':
      return 'book';
    default:
      return 'box';
  }
};

const staticNavigation = {
  core: {},
};

const categorizeComponents = (components) => {
  return components.reduce((previousValue, currentValue) => {
    const slug = currentValue.node.fields.slug;
    const category = slug.split('/')[1];
    const name = slug.split('/')[2];
    let componentsTree = previousValue;
    let currentCategory = componentsTree.find((c) => c.name == category);
    if (!currentCategory) {
      currentCategory = componentsTree.push({
        name: category,
        icon: iconForCategory(category),
        components: [],
      });
    }
    componentsTree
      .find((c) => c.name == category)
      .components.push({
        name: name,
        slug: slug,
      });
    return componentsTree;
  }, []);
};

export default ComponentsMenuItems;
