import React from 'react'
import { createUseStyles } from 'react-jss'
import map from '../img/map.png'
import compass from '../img/compass.png'
import smallKey from '../img/smallKey.png'
import bigKey from '../img/bigKey.png'
import chest from '../img/chest.png'
import classNames from 'classnames'

const useStyles = createUseStyles({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 49,
    borderBottom: '2px solid #000'
  },
  headerCell: {
    height: '100%',
    minWidth: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    "&:not(:last-child)": {
      borderRight: '1px solid #000',
    }
  },
  headerSubCellGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerSubCell: {
    width: 24,
    textAlign: 'center',
    fontSize: 16,
  },
  headerLocked: {
    width: 96,
    textAlign: 'center'
  }
}, { name: 'Header' })

const Header: React.FC<{}> = () => {
  const classes = useStyles()
  return <div className={classes.header}>
    <div className={classes.headerCell}>
    </div>
    <div className={classes.headerCell}>
      <div>
        E
      </div>
    </div>
    <div className={classes.headerCell}>
      <div>
        <img src={map} height={20} alt="map" />
      </div>
    </div>
    <div className={classes.headerCell}>
      <div>
        <img src={compass} height={20} alt="compass" />
      </div>
    </div>
    <div className={classes.headerCell}>
      <div>
        <img src={bigKey} height={20} alt="bigKey" />
      </div>
    </div>
    <div className={classes.headerCell}>
      <div><img src={smallKey} height={20} alt="smallKey" /></div>
      <div className={classes.headerSubCellGroup}>
        <div className={classes.headerSubCell}>F</div>
        <div className={classes.headerSubCell}>T</div>
        <div className={classes.headerSubCell}>U</div>
      </div>
    </div>
    <div className={classes.headerCell}>
      <div><img src={chest} height={20} alt="chest" /></div>
      <div className={classes.headerSubCellGroup}>
        <div className={classes.headerSubCell}>F</div>
        <div className={classes.headerSubCell}>T</div>
      </div>
    </div>
    <div className={classNames(classes.headerCell, classes.headerLocked)}>
      Required<br />Contains
    </div>
  </div>
}

export default Header
