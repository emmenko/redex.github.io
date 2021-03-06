open! Css

let root = style [
  display Flex;
  flexDirection Column;
  backgroundColor Theme.Inverted.Color.background;
  minHeight (vh 100.);
  color Theme.Inverted.Color.text;
]

let header = style [
  margin (em 1.45);
]

let links = style [
  selector "& > div" [ (* selects width container *)
    display Flex;
    textAlign Center;
    unsafe "padding" "0.5em 1.45em";

    selector "& > .left" [
      flex 1;
    ];

    selector "& > .right" [
      flex 1;
      textAlign Right;
    ];

    selector "& a" [
      unsafe "fontVariant" "small-caps";
      textDecoration None;
      textTransform Lowercase;
      unsafe "margin" "0 1em";
      opacity 0.75;

      selector "&:hover" [
        opacity 1.;
      ];
    ];
  ];
]

let inactiveLink = style [
  opacity 0.25 |> important;
  cursor (Custom "default");
]

let publishLink = style [
  flex 1;
  fontSize (em 0.85);
  unsafe "whiteSpace" "nowrap";
  outline (px 1) Solid Theme.Inverted.Color.text;
  unsafe "padding" ".5ex 1.5ex";

  selector "&:hover" [
    outline (px 1) Solid Theme.Inverted.Color.text;
  ];
]

let title = style [
  unsafe "margin" "1em 0 0";
  textAlign Center;
  unsafe "fontVariant" "small-caps";
  fontSize (rem 2.5);
  lineHeight (em 1.1);
  color (hex "fff6");

  selector "& > em" [
    fontStyle Normal;
    color white;
  ]
]

let logo = style [
  display Block;
  unsafe "margin" "0 auto";
  height (em 3.);
  unsafe "fill" (Theme.Inverted.Color.text |> Obj.magic);
]