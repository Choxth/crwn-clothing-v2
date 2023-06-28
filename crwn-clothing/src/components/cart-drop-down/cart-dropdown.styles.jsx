
import styled from 'styled-components';

import {BaseButton, GoogleSignInButton, InvertedButton } from '../button/button.styles'; 


// We don't need the nested definitions anymore because the styled components takes care of 
// selection. There is an advanced concept here where any of  the BaseButton, GoogleSignInButton, or InvertedButton 
// children of the CartDropdownContainer will have a style 


// This file looks ok. 

export const CartDropdownContainer = styled.div`
    position: absolute;
    width: 240px;
    height: 340px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;
    ${BaseButton, 
      GoogleSignInButton, 
      InvertedButton} { 
        margin-top: auto;
      }
                   
`; 

export const EmptyMessage = styled.span`
    font-size: 18px;
    margin: 50px auto;
`; 

export const CartItems = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`; 
