import React from 'react';
import { styled } from 'styled-components';
import AutoTrackingToggle from '../autotracking/AutoTrackingToggle';
import Header from '../components/Header';
import NotesModal from '../components/NotesModal';
import DungeonRow from '../components/DungeonRow';
import { Table } from '../styles/Table.styles';
import * as actions from '../config/actions';
import { AppContext, AutoTrackingMode, RequiredModalContext } from '../config/context';
import reducer, { init } from '../config/reducer';
import { DUNGEONS, Dungeon, RequiredItem } from '../config/types';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-family: monospace;
    width: fit-content;
    background-color: #404040;
    color: #FFF;
`

const App: React.FC<{}> = () => {
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

  return <Container>
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
        <Table>
          <Header />
          <tbody>
            {DUNGEONS.map((dungeon, index) => <DungeonRow key={index} dungeon={dungeon} stripped={index % 2 === 0} />)}
          </tbody>
        </Table>
        <NotesModal />
        <AutoTrackingToggle />
      </RequiredModalContext.Provider>
    </AppContext.Provider>
  </Container>
}


export default App;
