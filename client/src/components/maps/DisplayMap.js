import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const DisplayMap = compose(
  withProps({
    googleMapURL:`https://maps.googleapis.com/maps/api/js?v=3.exp&language=EN&key=
    ${process.env.REACT_APP_GOOGLE_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={props.location}
  >
    {props.isMarkerShown && <Marker position={props.location} />}
  </GoogleMap>
)

export default DisplayMap;