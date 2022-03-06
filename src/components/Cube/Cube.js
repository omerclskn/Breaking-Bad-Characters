import './Cube.scss'
import React from "react";

const Cube = () => (
  <div className="cube-wrapper">
    <div id="cube">
      <div className="side" id="side1">
        <div className="topleft">55.06</div>
        <div className="topright">
          -2
          <br /> -3
        </div>
        <div className="element">Cp</div>
        <div className="bottom1">26</div>
        <div className="bottom2">2-1-11-4</div>
      </div>
      <div className="side" id="side2">
        <div className="topleft">79.904</div>
        <div className="topright">
          -1
          <br /> +1
          <br /> +5
        </div>
        <div className="element">Br</div>
        <div className="bottom1">35</div>
        <div className="bottom2">2-8-18-7</div>
      </div>
      <div className="side" id="side3">
        <div className="topleft">22.95</div>
        <div className="topright"> +1</div>
        <div className="element">Na</div>
        <div className="bottom1">11</div>
        <div className="bottom2">2-4-1</div>
      </div>
      <div className="side" id="side4">
        <div className="topleft">137.33</div>
        <div className="topright">
          +2
          <br />
        </div>
        <div className="element">Ba</div>
        <div className="bottom1">56</div>
        <div className="bottom2">2-8-18-7</div>
      </div>
      <div className="side" id="side5">
        <div className="topleft">1.22</div>
        <div className="topright"> +4</div>
        <div className="element">Zr</div>
        <div className="bottom1">40</div>
        <div className="bottom2">2-8-18-7</div>
      </div>
      <div className="side" id="side6">
        <div className="topleft">107.07</div>
        <div className="topright"> +1</div>
        <div className="element">Ag</div>
        <div className="bottom1">47</div>
        <div className="bottom2">2-12-18-9</div>
      </div>
    </div>
    <div className="text reacking">eaking</div>
    <div className="text dlet">d</div>
  </div>
);

export default Cube;
