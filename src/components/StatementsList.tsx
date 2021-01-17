import React, { FC } from 'react'
import {
  List,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  ListItemSecondaryAction,
  Typography
} from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'
import { Statement } from 'src/api'
import { formatNumber } from 'src/utils'
import { groupBy } from 'lodash'
import moment from 'moment'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const sumBalance = (statements: Statement[]): number => statements.reduce((acc, item) => acc + item.amount, 0)

interface Props {
  items: Statement[]
}

export const StatementsList: FC<Props> = ({ items }) => {
  const classes = useStyles()
  const groups = groupBy(items, (item: Statement) => moment.unix(item.time).format('MMMM Do, dddd'))
  return (
    <List className={classes.root}>
      {Object.entries(groups).map(([day, statements]: [string, Statement[]]) => (
        <div key={day}>
          <div className={classes.header}>
            <Typography variant="subtitle2">{day}</Typography>
            <Typography variant="caption" align="center" color="textSecondary">
              {`${formatNumber(sumBalance(statements))} UAH`}
            </Typography>
          </div>
          {statements.map((item) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.description} secondary={`баланс: ${formatNumber(item.balance)} UAH`} />
              <ListItemSecondaryAction>{formatNumber(item.amount)} грн</ListItemSecondaryAction>
            </ListItem>
          ))}
        </div>
      ))}
    </List>
  )
}
