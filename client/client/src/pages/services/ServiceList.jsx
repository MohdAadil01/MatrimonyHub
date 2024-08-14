import React from "react";
import ListItem from "./ListItem";

function ServiceList({ list }) {
  console.log(list);
  return (
    <div className="list-wrap ">
      {list.map((item) => (
        <ListItem key={item.id} item={item} id={item._id} />
      ))}
    </div>
  );
}

export default ServiceList;
