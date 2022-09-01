import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameCardPanel } from "../../components/GameCardPanel/GameCardPanel";
import { usePagination } from "use-pagination-firestore";
import { getGames } from "../../firebase";
import { LinkGame } from "../../types/Game.interface";
import {
    collection,
    query,
    orderBy,
  } from "firebase/firestore";
  import { db } from "../../firebase/index";

export const GameControlPanel: React.FC = () => {

    const {
        items,
        isLoading,
        isStart,
        isEnd,
        getPrev,
        getNext,
    } = usePagination<LinkGame>(
        query(collection(db, "Games"), orderBy("title", "asc")),
        {
            limit: 10
        }
    );

    const nav = useNavigate();

    return (
    <div style={{ width:"100%", position:"relative"}}>
        <h1>Videogames Panel</h1>
        <Button onClick={() => nav("/Admin")} style={{position:"absolute", left:"10px", top:"10px"}}>{"Back"}</Button>
        {isLoading? <Spin/> : <></>}
        <div style={{  display:"flex", flexDirection:"row", flexWrap:"wrap",  justifyContent:"center"}}>
        {items.map(g => {
            return <GameCardPanel game={g}/>
        })}
        </div>
        <div style={{margin:"10px"}} hidden={isLoading}>
        <Button onClick={() => getPrev()} disabled={isStart}>Back</Button>
        <Button disabled={isEnd} onClick={()=> getNext()}>Next</Button>
        </div>
    </div>
    );
  };
  