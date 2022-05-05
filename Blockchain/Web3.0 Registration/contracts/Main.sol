//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Main{
    struct information{
        string name;
        string lname;
        string email;
        string password;
        string conPassword;
    }

    uint public id;
    mapping(uint => information) public informations;

    event str(string name,string lname,string email,string password,string _password);

    function Set(string memory _name,string memory _lname,string memory _email,string memory _password,string memory _conPassword)public {
        require(bytes(_name).length > 0,"Name is undefine");
        require(bytes(_lname).length > 0,"Lname is undefine");
        require(bytes(_email).length > 0,"Email is undefine");
        require(bytes(_password).length > 0,"Password is undefine");
        require(bytes(_conPassword).length > 0,"Confirm password is undefine");
        id++;
        information storage info = informations[id];
        info.name = _name;
        info.lname = _lname;
        info.email = _email;
        info.password = _password;
        info.conPassword = _conPassword;

        emit str(_name,_lname,_email,_password,_conPassword);
        

    }

    function Get(uint _id)public view returns(string memory,string memory,string memory){
        return (informations[_id].name,informations[_id].lname,informations[_id].email);
    } 


}


