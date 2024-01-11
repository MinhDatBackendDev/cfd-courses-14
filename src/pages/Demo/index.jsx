import React, { useEffect } from "react";
import { increment, decrement } from "@store/actions/countActions";
import { useDispatch, useSelector } from "react-redux";
import Button from "@components/Button";
import { fetchRandomDog, updateDog } from "@store/actions/dogAction";

const Demo = () => {
  useEffect(() => {
    dispatch(fetchRandomDog());
  }, []);
  const counter = useSelector((state) => state.counter);
  const dog = useSelector((state) => state.dog);
  const dispatch = useDispatch();

  return (
    <div className="demo">
      <h1>Counter: {counter}</h1>
      <Button variant="primary" onClick={() => dispatch(increment())}>
        +
      </Button>
      <Button variant="primary" onClick={() => dispatch(decrement())}>
        -
      </Button>
      <div className="demo">
        <Button
          variant="primary"
          onClick={() => {
            dispatch(fetchRandomDog());
          }}
        >
          Change
        </Button>
        {dog?.message ? (
          <img src={dog.message} atl="" />
        ) : (
          <p>Không tìm thấy ảnh cún nào!</p>
        )}
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     counter: state,
//   };
// };

// export default connect(mapStateToProps, { increment, decrement })(Demo);

export default Demo;
