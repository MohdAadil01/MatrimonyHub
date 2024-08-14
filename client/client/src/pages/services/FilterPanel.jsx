import React from "react";
import FilterListToogle from "../../components/FilterListToggle";
import { categoryList, ratingList } from "../../assets";
import FilterRatingToogle from "../../components/FilterListToggle/ratingToggle";
import CheckboxProton from "../../components/CheckboxProton";
import SliderProton from "../../components/SliderProton";

function FilterPanel({
  selectedCategory,
  selectToggle,
  selectRating,
  selectedRating,
  availability,
  changeChecked,
  selectedPrice,
  changedPrice
}) {
  return (
    <div>
      {/*Category*/}
      <div className="input-group mb-8 ">
        <p className="label mb-3 font-semibold">Category</p>
        <FilterListToogle
          options={categoryList}
          value={selectedCategory}
          selectToggle={selectToggle}
        />
      </div>
      {/*Avalability*/}
      <div className="input-group mb-8 ">
        <p className="label mb-3 font-semibold">Avalability</p>
        {availability.map((ava) => (
          <CheckboxProton
            key={ava.id}
            avaliability={ava}
            changeChecked={changeChecked}
          />
        ))}
      </div>
      {/*Rating*/}
      <div className="input-group mb-8 ">
        <p className="label mb-3 font-semibold">Rating</p>
        <FilterRatingToogle
          options={ratingList}
          value={selectedRating}
          selectToggle={selectRating}
        />
      </div>
      {/*price range*/}
      <div className="input-group mb-10 ">
        <p className="label mb-10 font-semibold">Price Range</p>
        <SliderProton value={selectedPrice} changedPrice={changedPrice} />
      </div>
    </div>
  );
}

export default FilterPanel;
