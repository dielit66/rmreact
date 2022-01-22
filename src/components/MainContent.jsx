import rmLogo from '../rm.png'
import './MainContent.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function MainContent() {



    const [charData, setCharData] = useState([]);
    useEffect( () => {

      axios
            .get('https://rickandmortyapi.com/api/character')
            .then((response)=>{

                setCharData(response.data.results)
                console.log(charData)
            })
    });

    return (

        <div className="main-content">
            <img alt={'Логотип123'} className={'rm-logo'} src={rmLogo}/>
<div className={'form-filter'}>
            <FormControl  sx={{ m: 1, minWidth: 120 }}    className={'filter-item'} >
                <InputLabel  id="search-input">Filter by name...</InputLabel>
                <Select
                    labelId="search-input"
                    id="demo-simple-select"

                    label="Age"
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl  sx={{ m: 1, minWidth: 120 }}    className={'filter-item'} >
                <InputLabel id="species-input">Species</InputLabel>
                <Select
                    labelId="species-input"
                    id="demo-simple-select"

                    label="Age"
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl  sx={{ m: 1, minWidth: 120 }}   className={'filter-item'}  >
                <InputLabel id="gender-input">Gender</InputLabel>
                <Select
                    labelId="gender-input"
                    id="demo-simple-select"

                    label="Age"
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl  sx={{ m: 1, minWidth: 120 }}    className={'filter-item'} >
                <InputLabel id="status-input">Status</InputLabel>
                <Select
                    labelId="status-input"
                    id="demo-simple-select"

                    label="Age"
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

</div>
            <div className={'char-list'}>
                {charData.map(data => <div className={'char-item'}>
                    <div className={'img-form'}>
                    <img src={data.image} alt=""/>
                    </div>
                    <div className={'text-form'}>
                    <p className={'name-form'}>{data.name}</p>
                <p className={'species-form'}> {data.species}</p>
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default MainContent;
