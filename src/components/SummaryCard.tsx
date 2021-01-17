import React, { FC, ReactText } from 'react'
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 14
  }
}))

interface Props {
  title: ReactText
  primary: ReactText
  secondary: ReactText
}
export const SummaryCard: FC<Props> = ({ title, primary, secondary }) => {
  const classes = useStyles()
  return (
    <Card>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          {primary}
        </Typography>
        <Typography color="textSecondary" variant="caption">
          {secondary}
        </Typography>
      </CardContent>
    </Card>
  )
}
