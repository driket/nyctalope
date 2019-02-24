/** @jsx jsx */
import FeatherIcon from 'feather-icons-react'
import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { jsx, css } from '@emotion/core'

const iconForCategory = (category) => {
  switch (category) {
    case 'data-viz':
      return 'pie-chart'
    case 'layout':
      return 'layout'
    case 'document':
      return 'file'
    case 'style':
      return 'book'
    default:
      return 'box'
  }
}

const categorizeComponents = (components) => {
  return components.reduce((previousValue, currentValue) => {
    const slug = currentValue.node.fields.slug
    const category = slug.split('/')[1]
    const name = slug.split('/')[2]
    let componentsTree = previousValue
    let currentCategory = componentsTree.find((c) => c.name == category)
    if (!currentCategory) {
      currentCategory = componentsTree.push({
        name: category,
        icon: iconForCategory(category),
        components: [],
      })
    }
    componentsTree
      .find((c) => c.name == category)
      .components.push({
        name: name,
        slug: slug,
      })
    return componentsTree
  }, [])
}

const MenuCategory = (props) => {
  const icon = props.icon || 'cube'
  const name = props.name || ''
  const components = props.components || []
  return (
    <ul style={{ paddingLeft: '20px' }}>
      <li
        key={name}
        css={css`
          min-height: 30px;
          list-style: none;
          padding-left: 0px;
          display: flex;
          flex-direction: row;
          align-items: center;
          /* width: 150px; */
          clear: both;
          text-transform: capitalize;
          margin-left: 0px;
        `}
      >
        <FeatherIcon
          icon={icon}
          css={css`
            margin-right: 10px;
          `}
        />
        {name}
      </li>
      <ul
        css={css`
          padding-left: 34px;
        `}
      >
        {components.map((component) => {
          return (
            <li
              key={component.name}
              css={css`
                list-style: none;
                margin: 0;
                min-height: 30px;
                display: flex;
                flex-direction: row;
                align-items: center;
                /* width: 200px; */
                clear: both;
              `}
            >
              <Link to={component.slug}>{component.name}</Link>
            </li>
          )
        })}
      </ul>
    </ul>
  )
}

export const ComponentsMenuItems = (props) => {
  const { components } = props
  const categorizedComponents = categorizeComponents(components)
  console.log(categorizedComponents)
  return categorizedComponents.map((category) => {
    return (
      <ul
        css={css`
          padding-left: 0px;
        `}
      >
        <MenuCategory
          icon={category.icon}
          name={category.name}
          components={category.components}
        />
      </ul>
    )
  })
}

export default ComponentsMenuItems
