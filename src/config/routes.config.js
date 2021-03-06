import PackDetails from '../pages/PackDetails.page'
import Collection from '../pages/Collection.page'
import Home from '../pages/Home.page'
import Designer from '../pages/Designer.page'
import Artwork from '../pages/Artwork.page'

export const ROUTES = [
  { name: "Home", path: "/", component: Home, nav: true },
  { name: "Collection", path: '/collection', component: Collection, nav: true },
  { name: "PackDetails", path: '/packs/:packID', component: PackDetails, nav: false },
  { name: "Designer", path: '/designer', component: Designer, nav: false },
  { name: "Artwork", path: '/artwork', component: Artwork, nav: false }
]

export const NAV_ROUTES = ROUTES.filter(r => r.nav)