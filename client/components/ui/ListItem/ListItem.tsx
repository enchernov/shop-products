import React, { FunctionComponent, forwardRef, Ref, ElementType } from 'react'
import {
  ListItem as MuiListItem,
  ListItemProps,
  ListItemIcon,
  ListItemText,
  SvgIconProps,
} from '@material-ui/core'
import { Cloud, Save, Favorite } from '@material-ui/icons'
import clsx from 'clsx'

import { useStyles } from './ListItem.styles'

type IconType = 'cloud' | 'save' | 'favorite'

export interface IListItemProps extends ListItemProps {
  button: any
  disabled?: boolean
  className?: string
  icon?: IconType
  text: string
  selected?: boolean
  onClick: (event: any) => void
}

const iconListItemMap: Record<IconType, ElementType<SvgIconProps>> = {
  cloud: Cloud,
  save: Save,
  favorite: Favorite,
}

const defaultProps: Partial<IListItemProps> = {
  button: true,
  disabled: false,
  selected: false,
}

type DefaultProps = Readonly<typeof defaultProps>

type ListItemPropsType = IListItemProps & DefaultProps

const ListItem: FunctionComponent<Partial<ListItemPropsType>> = forwardRef(
  (
    { button, disabled, className, icon, text, selected, onClick, ...props },
    ref: Ref<HTMLLIElement>
  ) => {
    const classes = useStyles()
    const classesIconButton = clsx(classes.listItem, className)

    const IconComponent: any = icon ? iconListItemMap[icon] : null
    const iconItem = icon ? (
      <ListItemIcon className={selected ? classes.icon : 'undefined'}>
        <IconComponent />
      </ListItemIcon>
    ) : undefined

    return (
      <MuiListItem
        ref={ref}
        button={button}
        className={classesIconButton}
        disabled={disabled}
        selected={selected}
        onClick={onClick}
        {...props}
      >
        {iconItem}
        <ListItemText primary={text} disableTypography />
      </MuiListItem>
    )
  }
)

ListItem.defaultProps = defaultProps

export default ListItem
