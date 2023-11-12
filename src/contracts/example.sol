// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.19;

contract Example {
  uint256 number;
  uint256[] data;

  function setNumber(uint256 _number) public {
    number = _number;
  }

  function getNumber() public view returns(uint256){
    return number;
  }

  function addToData(uint256 _number) public {
    data.push(_number);
  }

  function getData() public view returns(uint256[] memory){
    return data;
  }
}