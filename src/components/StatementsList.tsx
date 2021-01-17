import React, { FC } from 'react'
import { List, Avatar, ListItem, ListItemAvatar, ListItemText, makeStyles, Theme } from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'
import { Statement } from '../api'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}))

interface Props {
  items: Statement[]
}

export const StatementsList: FC<Props> = ({ items }) => {
  const classes = useStyles()

  return (
    <List className={classes.root}>
      {items.map((item) => (
        <ListItem key={item.id}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.description} secondary="Jan 9, 2014" />
        </ListItem>
      ))}
    </List>
  )
}
