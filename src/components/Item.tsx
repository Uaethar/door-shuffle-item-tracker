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

type Props = {
    item: RequiredItem,
    height?: number
}


const Item: React.FC<Props> = ({ item, height = 20 }) => {
    switch (item) {
        case 'bombos': return <img src={bombos} alt="bombos" height={height} />
        case 'boots': return <img src={boots} alt="boots" height={height} />
        case 'bow': return <img src={bow} alt="bow" height={height} />
        case 'firerod': return <img src={firerod} alt="firerod" height={height} />
        case 'flippers': return <img src={flippers} alt="flippers" height={height} />
        case 'glove': return <img src={glove} alt="glove" height={height} />
        case 'hammer': return <img src={hammer} alt="hammer" height={height} />
        case 'hookshot': return <img src={hookshot} alt="hookshot" height={height} />
        case 'lantern': return <img src={lantern} alt="lantern" height={height} />
        case 'somaria': return <img src={somaria} alt="somaria" height={height} />
        case 'torch': return <img src={torch} alt="torch" height={height} />
        case 'dam': return <span>DAM</span>
        case 'attic': return <span>ATT<br />IC</span>
        default: return null
    }
}

export default Item