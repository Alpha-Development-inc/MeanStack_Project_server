import React from 'react';
import { compose, withStateHandlers } from "recompose";
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';

const CreateMap = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
      }), {
        onMapClick: ({ isMarkerShown }) => (e) => ({
            markerPosition: e.latLng,
            isMarkerShown:true
        })
      }),
    withScriptjs,
    withGoogleMap
) (props => {
    return (
        <GoogleMap defaultZoom={10} defaultCenter={{lat:43.653225, lng:-79.383186}}
        onClick={props.onMapClick}>
        {props.isMarkerShown && <Marker position={props.markerPosition} />}
        </GoogleMap>
    );
}
);

export default CreateMap;