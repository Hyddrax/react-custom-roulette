var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useState, useEffect, useRef } from 'react';
import { getRotationDegrees } from '../../utils';
import { rouletteSelector } from '../common/images';
import { RouletteContainer, RouletteSelectorImage, RotationContainer, } from './styles';
import { DEFAULT_BACKGROUND_COLORS, DEFAULT_TEXT_COLORS, DEFAULT_OUTER_BORDER_COLOR, DEFAULT_OUTER_BORDER_WIDTH, DEFAULT_INNER_RADIUS, DEFAULT_INNER_BORDER_COLOR, DEFAULT_INNER_BORDER_WIDTH, DEFAULT_RADIUS_LINE_COLOR, DEFAULT_RADIUS_LINE_WIDTH, DEFAULT_FONT_SIZE, DEFAULT_TEXT_DISTANCE, } from '../../strings';
import WheelCanvas from '../WheelCanvas';
var STARTED_SPINNING = 'started-spinning';
var START_SPINNING_TIME = 2600;
var CONTINUE_SPINNING_TIME = 750;
var STOP_SPINNING_TIME = 8000;
export var Wheel = function (_a) {
    var mustStartSpinning = _a.mustStartSpinning, prizeNumber = _a.prizeNumber, data = _a.data, _b = _a.onStopSpinning, onStopSpinning = _b === void 0 ? function () { return null; } : _b, _c = _a.backgroundColors, backgroundColors = _c === void 0 ? DEFAULT_BACKGROUND_COLORS : _c, _d = _a.textColors, textColors = _d === void 0 ? DEFAULT_TEXT_COLORS : _d, _e = _a.outerBorderColor, outerBorderColor = _e === void 0 ? DEFAULT_OUTER_BORDER_COLOR : _e, _f = _a.outerBorderWidth, outerBorderWidth = _f === void 0 ? DEFAULT_OUTER_BORDER_WIDTH : _f, _g = _a.innerRadius, innerRadius = _g === void 0 ? DEFAULT_INNER_RADIUS : _g, _h = _a.innerBorderColor, innerBorderColor = _h === void 0 ? DEFAULT_INNER_BORDER_COLOR : _h, _j = _a.innerBorderWidth, innerBorderWidth = _j === void 0 ? DEFAULT_INNER_BORDER_WIDTH : _j, _k = _a.radiusLineColor, radiusLineColor = _k === void 0 ? DEFAULT_RADIUS_LINE_COLOR : _k, _l = _a.radiusLineWidth, radiusLineWidth = _l === void 0 ? DEFAULT_RADIUS_LINE_WIDTH : _l, _m = _a.fontSize, fontSize = _m === void 0 ? DEFAULT_FONT_SIZE : _m, _o = _a.perpendicularText, perpendicularText = _o === void 0 ? false : _o, _p = _a.textDistance, textDistance = _p === void 0 ? DEFAULT_TEXT_DISTANCE : _p, _q = _a.startSpinningTime, startSpinningTime = _q === void 0 ? START_SPINNING_TIME : _q, _r = _a.continueSpinningTime, continueSpinningTime = _r === void 0 ? CONTINUE_SPINNING_TIME : _r, _s = _a.stopSpinningTime, stopSpinningTime = _s === void 0 ? STOP_SPINNING_TIME : _s;
    var _t = useState(__spreadArray([], data)), wheelData = _t[0], setWheelData = _t[1];
    var _u = useState(0), startRotationDegrees = _u[0], setStartRotationDegrees = _u[1];
    var _v = useState(0), finalRotationDegrees = _v[0], setFinalRotationDegrees = _v[1];
    var _w = useState(false), hasStartedSpinning = _w[0], setHasStartedSpinning = _w[1];
    var _x = useState(false), hasStoppedSpinning = _x[0], setHasStoppedSpinning = _x[1];
    var _y = useState(false), isCurrentlySpinning = _y[0], setIsCurrentlySpinning = _y[1];
    var _z = useState(false), isDataUpdated = _z[0], setIsDataUpdated = _z[1];
    var mustStopSpinning = useRef(false);
    useEffect(function () {
        var _a, _b;
        var dataLength = data.length;
        var wheelDataAux = [{ option: '' }];
        for (var i = 0; i < dataLength; i++) {
            wheelDataAux[i] = __assign(__assign({}, data[i]), { style: {
                    backgroundColor: ((_a = data[i].style) === null || _a === void 0 ? void 0 : _a.backgroundColor) ||
                        backgroundColors[i % backgroundColors.length],
                    textColor: ((_b = data[i].style) === null || _b === void 0 ? void 0 : _b.textColor) || textColors[i % textColors.length],
                } });
        }
        setWheelData(__spreadArray([], wheelDataAux));
        setIsDataUpdated(true);
    }, [data, backgroundColors, textColors]);
    useEffect(function () {
        if (mustStartSpinning && !isCurrentlySpinning) {
            setIsCurrentlySpinning(true);
            startSpinning();
            var finalRotationDegreesCalculated = getRotationDegrees(prizeNumber, data.length);
            setFinalRotationDegrees(finalRotationDegreesCalculated);
        }
    }, [mustStartSpinning]);
    useEffect(function () {
        if (hasStoppedSpinning) {
            setIsCurrentlySpinning(false);
            setStartRotationDegrees(finalRotationDegrees);
        }
    }, [hasStoppedSpinning]);
    var startSpinning = function () {
        setHasStartedSpinning(true);
        setHasStoppedSpinning(false);
        mustStopSpinning.current = true;
        setTimeout(function () {
            if (mustStopSpinning.current) {
                mustStopSpinning.current = false;
                setHasStartedSpinning(false);
                setHasStoppedSpinning(true);
                onStopSpinning();
            }
        }, startSpinningTime + continueSpinningTime + stopSpinningTime - 300);
    };
    var getRouletteClass = function () {
        if (hasStartedSpinning) {
            return STARTED_SPINNING;
        }
        return '';
    };
    if (!isDataUpdated) {
        return null;
    }
    return (React.createElement(RouletteContainer, null,
        React.createElement(RotationContainer, { className: getRouletteClass(), startSpinningTime: startSpinningTime, continueSpinningTime: continueSpinningTime, stopSpinningTime: stopSpinningTime, startRotationDegrees: startRotationDegrees, finalRotationDegrees: finalRotationDegrees },
            React.createElement(WheelCanvas, { width: "900", height: "900", data: wheelData, outerBorderColor: outerBorderColor, outerBorderWidth: outerBorderWidth, innerRadius: innerRadius, innerBorderColor: innerBorderColor, innerBorderWidth: innerBorderWidth, radiusLineColor: radiusLineColor, radiusLineWidth: radiusLineWidth, fontSize: fontSize, perpendicularText: perpendicularText, textDistance: textDistance })),
        React.createElement(RouletteSelectorImage, { src: rouletteSelector.src, alt: "roulette-static" })));
};
