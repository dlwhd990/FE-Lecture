"use strict";
const joans = {
  name: "hihi",
  print: function () {
    console.log(this);
    const a = () => {
      console.log(this);
    };
    a();
  },
};

joans.print();
