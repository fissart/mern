import React from "react";
import { useGeolocated } from "react-geolocated";

const Demo = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    return !isGeolocationAvailable ? (
        <div>Su navegador no admite geolocalización</div>
    ) : !isGeolocationEnabled ? (
        <div>La geolocalización no está habilitada</div>
    ) : coords ? (
        <table>
            <tbody>
                <tr>
                    <td>latitud</td>
                    <td>{coords.latitude}</td>
                </tr>
                <tr>
                    <td>longitud</td>
                    <td>{coords.longitude}</td>
                </tr>
                <tr>
                    <td>altitud</td>
                    <td>{coords.altitude}</td>
                </tr>
                <tr>
                    <td>dirección</td>
                    <td>{coords.heading}</td>
                </tr>
                <tr>
                    <td>velocidad</td>
                    <td>{coords.speed}</td>
                </tr>
            </tbody>
        </table>
    ) : (
        <div>Obtener los datos de ubicación&hellip; </div>
    );
};

export default Demo