

//jshint ignore: start

pragma solidity ^0.4.11;

import './Ownable.sol';
import './Don.sol';

contract Donatti is Ownable {
  
  address[] public dons;
  mapping(address => uint256[]) public donMap;
  
  function() payable {}
  
  //new don
  function create(string _name, bool _open, bool _over, uint256 _start, uint256 _end, uint256 _goal, string _url) payable {
    Don don = new Don(this);
    don.update(_name, _open, _over, _start, _end, _goal, _url);
    don.transferOwnership(msg.sender);
    donMap[msg.sender].push(dons.length);
    dons.push(don);
  }
  
  //get dons
  function getDons() returns (address[], uint256[]) {
    uint256[] storage list = donMap[msg.sender];
    address[] memory addr = new address[](list.length);
    for (uint i = 0; i < list.length; i++) {
      addr[i] = dons[list[i]];
    }
    return (addr, list);
  }
  
  function totalDons() constant returns(uint256) {
    return dons.length;
  }
  
}

//jshint ignore: end