import React from 'react'
import { RequiredItem } from '../config/types'
import bombos from '../img/bombos.png'
import boots from '../img/boots.png'
import bow from '../img/bow.png'
import firerod from '../img/firerod.png'
import flippers from '../img/flippers.png'
import glove from '../img/glove.png'
import hammer from '../img/hammer.png'
import hookshot from '../img/hookshot.png'
import lantern from '../img/lantern.png'
import somaria from '../img/somaria.png'
import torch from '../img/torch.png'
import bigKey from '../img/bigKey.png'
import smallKey from '../img/smallKey.png'
import sword from '../img/sword.png'
import bombs from '../img/bombs.png'
import blueSwitch from '../img/blueSwitch.png'
import redSwitch from '../img/redSwitch.png'
import cross from '../img/cross.svg'

type Props = {
    item: RequiredItem,
    height?: number
}


const ItemImage: React.FC<Props> = ({ item, height = 20 }) => {
    switch (item) {
        case 'bombos': return <img src={bombos} alt="" height={height} />
        case 'boots': return <img src={boots} alt="" height={height} />
        case 'bow': return <img src={bow} alt="" height={height} />
        case 'firerod': return <img src={firerod} alt="" height={height} />
        case 'flippers': return <img src={flippers} alt="" height={height} />
        case 'glove': return <img src={glove} alt="" height={height} />
        case 'hammer': return <img src={hammer} alt="" height={height} />
        case 'hookshot': return <img src={hookshot} alt="" height={height} />
        case 'lantern': return <img src={lantern} alt="" height={height} />
        case 'somaria': return <img src={somaria} alt="" height={height} />
        case 'torch': return <img src={torch} alt="" height={height} />
        case 'bigKey': return <img src={bigKey} alt="" height={height} />
        case 'smallKey': return <img src={smallKey} alt="" height={height} />
        case 'sword': return <img src={sword} alt="" height={height} />
        case 'bombs': return <img src={bombs} alt="" height={height} />
        case 'blueSwitch': return <img src={blueSwitch} alt="" height={height} />
        case 'redSwitch': return <img src={redSwitch} alt="" height={height} />
        case 'other': return <img src={cross} alt="" height={height} />
        case 'dam': return <span>DAM</span>
        case 'attic': return <span>ATT<br />IC</span>
        default: return null
    }
}

export default ItemImage