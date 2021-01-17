import React, { FC } from 'react'
import {
  List,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  ListItemSecondaryAction
} from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'
import { Statement } from 'src/api'
import { formatNumber } from 'src/utils'
import { groupBy, sortBy } from 'lodash'
import clsx from 'clsx'

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

const sumStatementsAmount = (statements: Statement[]): number => statements.reduce((acc, item) => acc + item.amount, 0)

type ExpenseCategory = {
  description: string
  totalSpent: number
}
interface Props {
  income: number
  className?: string
  items: Statement[]
}

export const ExpensesList: FC<Props> = ({ className, income, items }) => {
  const classes = useStyles()
  const categories = Object.entries(groupBy(items, (item: Statement) => item.description)).map(
    ([description, statements]) => ({
      description,
      totalSpent: sumStatementsAmount(statements)
    })
  )
  return (
    <List className={clsx(classes.root, className)}>
      {sortBy(categories, 'totalSpent').map(({ description, totalSpent }: ExpenseCategory) => (
        <ListItem key={description}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={description} secondary={`${((totalSpent * 100) / income).toFixed(2)}%`} />
          <ListItemSecondaryAction>{formatNumber(totalSpent)} грн</ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}
