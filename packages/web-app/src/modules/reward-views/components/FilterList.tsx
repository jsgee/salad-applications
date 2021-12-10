import React, { Component } from 'react'
import withStyles, { WithStyles } from 'react-jss'
import { SaladTheme } from '../../../SaladTheme'
import classnames from 'classnames'
import { FilterItem } from '../../reward/models/FilterItem'
import { Checkbox } from '../../../components'
import { Observer, observer } from 'mobx-react'

const styles = (theme: SaladTheme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
  },
  title: {
    color: theme.lightGreen,
    fontFamily: 'sharpGroteskBook25',
    fontSize: '12px',
    paddingBottom: '.25rem',
    letterSpacing: '1px',
  },
  filterText: {
    textTransform: 'capitalize',
    fontSize: '12px',
    paddingLeft: '.75rem',
  },
})

interface Props extends WithStyles<typeof styles> {
  filters?: FilterItem[]
  onToggle?: (filter: string) => void
}

@observer
class _FilterList extends Component<Props> {
  handleToggle = (name: string) => {
    const { onToggle } = this.props
    if (onToggle != null) {
      onToggle(name)
    }
  }
  render() {
    const { filters, classes } = this.props
    return (
      <div className={classnames(classes.container)}>
        <div className={classes.title}>FILTERS:</div>
        {filters &&
          filters.map(x => (
            <Observer key={x.name}>
              {() => (
                <Checkbox
                  textClassName={classes.filterText}
                  checked={x.checked}
                  text={x.name}
                  onClick={() => {
                    this.handleToggle(x.name)
                  }}
                />
              )}
            </Observer>
          ))}
      </div>
    )
  }
}

export const FilterList = withStyles(styles)(_FilterList)
