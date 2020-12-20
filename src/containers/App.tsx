import React from 'react';
import { createUseStyles } from 'react-jss';
import { Dungeon, DUNGEONS, RequiredItem } from '../config/types'
import Header from '../components/Header'
import reducer, { init } from '../config/reducer';
import * as actions from '../config/actions'
import { AppContext, AutoTrackingMode, RequiredModalContext } from '../config/context';
import Row from '../components/Row';
import RequiredItemModal from '../components/RequiredItemModal';
import AutoTrackingToggle from '../autotracking/AutoTrackingToggle';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    fontFamily: 'monospace',
    width: 'fit-content',
    backgroundColor: '#404040',
    color: '#FFF',
  }
})

const App: React.FC<{}> = () => {
  const classes = useStyles()
  const [state, dispatch] = React.useReducer(reducer, init)

  const toggleMap = React.useCallback(actions.toggleMap(dispatch), [])
  const toggleCompass = React.useCallback(actions.toggleCompass(dispatch), [])
  const toggleBigKeyFound = React.useCallback(actions.toggleBigKeyFound(dispatch), [])
  const toggleBigKeyUnaivalable = React.useCallback(actions.toggleBigKeyUnaivalable(dispatch), [])
  const addSmallKey = React.useCallback(actions.addSmallKey(dispatch), [])
  const removeSmallKey = React.useCallback(actions.removeSmallKey(dispatch), [])
  const addChest = React.useCallback(actions.addChest(dispatch), [])
  const removeChest = React.useCallback(actions.removeChest(dispatch), [])
  const addEntrance = React.useCallback(actions.addEntrance(dispatch), [])
  const removeEntrance = React.useCallback(actions.removeEntrance(dispatch), [])
  const setRequired = React.useCallback(actions.setRequired(dispatch), [])
  const setFromWebSocket = React.useCallback(actions.setFromWebSocket(dispatch), [])
  const resetTracker = React.useCallback(actions.resetTracker(dispatch), [])

  const [openModale, setOpenModale] = React.useState(false)
  const [dungeon, setDungeon] = React.useState<Dungeon>()
  const [requiredModal, setRequiredModal] = React.useState<Array<RequiredItem>>([])
  const [autoTracking, setAutoTracking] = React.useState<AutoTrackingMode>('disabled')

  return <div className={classes.root}>
    <Header />
    <AppContext.Provider value={{
      state,
      actions: {
        toggleMap,
        toggleCompass,
        toggleBigKeyFound,
        toggleBigKeyUnaivalable,
        addSmallKey,
        removeSmallKey,
        addChest,
        removeChest,
        addEntrance,
        removeEntrance,
        setRequired,
        setFromWebSocket,
        resetTracker
      },
      autoTracking,
      setAutoTracking
    }}>
      <RequiredModalContext.Provider value={{
        dungeon: dungeon,
        required: requiredModal,
        open: openModale,
        handleOpen: (dungeon: Dungeon, required: Array<RequiredItem>) => {
          setDungeon(dungeon)
          setRequiredModal(required)
          setOpenModale(true)
        },
        handleClose: () => {
          setDungeon(undefined)
          setRequiredModal([])
          setOpenModale(false)
        }
      }}>
        {DUNGEONS.map((dungeon, index) => <Row key={index} dungeon={dungeon} stripped={index % 2 === 0} />)}
        <RequiredItemModal />
        <AutoTrackingToggle />
      </RequiredModalContext.Provider>
    </AppContext.Provider>
  </div>
}


export default App;
