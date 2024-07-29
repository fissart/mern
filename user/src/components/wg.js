import React, { Component } from "react";
import styled from "styled-components";
import Member from "./wwg";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => `${props.level * 30}px`};
`;

export default class FamilyTree extends Component {
  hasChildren(member) {
    return member.children && member.children.length;
  }
  render() {
    const level = this.props.level || 0;
    return (
      <StyledWrapper level={level}>
        {this.props.members.map((member, i) => {
          return (
            <div key={`level-${level}-${i}`}>
              <Member {...member} />
              {this.hasChildren(member) && (
                <FamilyTree members={member.children} level={level + 1} />
              )}
            </div>
          );
        })}
      </StyledWrapper>
    );
  }
}

/*
c


db.categories.aggregate([
    {
      $lookup: {
        from: "curses",
        localField: "_id",
        foreignField: "category",
        as: "curse",
      },
    },
    {
        "$unwind": "$curse"
      },
      {
      $lookup: {
        from: "chapters",
        localField: "curse._id",
        foreignField: "curse",
        as: "curseww",
      },
    },
       {
        "$unwind": "$curseww"
      },
      {
      $group : {
      _id : '$_id',  
      count : {$sum : 1},
      nombre: {$first: "$nombre"},
      question: {$push: {
            _id: "$curse._id",
            c_id: "$curse.category",
            nombre: "$curse.nombre",
            contenido: "$curse.contenido",
            options: "$curseww"
        }}
}
}
  ]).pretty()

//
PORT = 1000
NODE_ENV = development
MONGO_URI = mongodb://localhost:27017/fisart
//CLIENT_URL = http://www.fismaths.cf
MAIL_KEY = www
JWT_SECRET = 
JWT_ACCOUNT_ACTIVATION= wwwwwwwwwww
JWT_RESET_PASSWORD= wwwwwwww
EMAIL_TO= none@congar.com
EMAIL_FROM= ricardomallqui6@gmail.com
GOOGLE_CLIENT= 712134225346-4bmerv9fjnqqd7rsbcdsfhp3nkv4bjj6.apps.googleusercontent.com
//

db.curses.aggregate([
    {
      $match: {
        _id:  ObjectId("604043a58e648315785b4135"),
      },
    },
    { "$lookup": {
      "from": "testresps",
      "let": { "wwz": "$_id" },
      "pipeline": [
        { "$match": { "$expr": { $and:
          [ {"$eq": ["$foreign", "$$wwz"] }, {"$eq": ["$user", ObjectId("6012efd01b88072968db043e")] }] 
        }}},
      ], 
      "as": "testchp"
    }},
    { "$lookup": {
      "from": "tasks",
      "let": { "wwz": "$_id" },
      "pipeline": [
        { "$match": { "$expr": { $and:
          [ {"$eq": ["$section", "$$wwz"] }, {"$eq": ["$user", ObjectId("6012efd01b88072968db043e")] }] 
        }}},
      ], 
      "as": "taskchp"
    }},
   {"$lookup": {
        "from": "chapters",
        "let": { "ww": "$_id" },
        "pipeline": [
          { "$match": { "$expr": { "$eq": ["$curse", "$$ww"] }}},
          { "$lookup": {
            "from": "seccions",
            "let": { "www": "$_id" },
            "pipeline": [
              { "$match": { "$expr": { "$eq": ["$chapter", "$$www"] }}},

              { "$lookup": {
                "from": "tasks",
                "let": { "wwz": "$_id" },
                "pipeline": [
                  { "$match": { "$expr": { $and:
                    [ {"$eq": ["$section", "$$wwz"] }, {"$eq": ["$user", ObjectId("6012efd01b88072968db043e")] }] 
                  }}},
                ], 
                "as": "tasks"
              }}

            ], 
            "as": "sec"
          }},
          { "$lookup": {
            "from": "tasks",
            "let": { "wrw": "$_id" },
            "pipeline": [
             { "$match": { "$expr": { $and:
                [ {"$eq": ["$chapter", "$$wrw"] }, {"$eq": ["$user", ObjectId("6012efd01b88072968db043e")] }] 
              }}},
              {
                $group : {
                    _id : '$chapter',
                    conteo : {$sum : 1}, 
                    totalCalification : {$sum : { $sum : ['$calification', '$fee']}}, 
                    averageCalification : {$avg : { $sum : ['$calification', '$fee']}}
                }
              }
            ], 
            "as": "resultasks"
          }},
        ],
        "as": "capitulos"
      }},
      { "$lookup": {
                "from": "chapters",
                "let": { "wwwzz": "$_id" },
                "pipeline": [
                  { "$match": { "$expr": { "$eq": ["$curse", "$$wwwzz"] }}},
                  { "$lookup": {
                    "from": "testresps",
                    "let": { "wwz": "$_id" },
                    "pipeline": [
                      { "$match": { "$expr": { $and:
                        [ {"$eq": ["$foreign", "$$wwz"] }, {"$eq": ["$user", ObjectId("6012efd01b88072968db043e")] }] 
                      }}},
                    ], 
                    "as": "test"
                  }}
                ], 
                "as": "chptests"
      }},
      { "$lookup": {
        "from": "testresps",
        "let": { "wrw": "$_id" },
        "pipeline": [
          { "$match": { "$expr": { $and:
            [ {"$eq": ["$curse", "$$wrw"] }, {"$eq": ["$user", ObjectId("6012efd01b88072968db043e")] }] 
          }}},
          {
            $group : {
                _id : '$identificadortema',
                conteo : {$sum : 1}, 
                totalCalification : {$sum : { $sum : ['$calification', '$fee']}}, 
                averageCalification : {$avg : { $sum : ['$calification', '$fee']}}
            }
          }
        ], 
        "as": "resultests"
      }},
      { "$lookup": {
                "from": "themes",
                "let": { "wwwzz": "$_id" },
                "pipeline": [
                  { "$match": { "$expr": { "$eq": ["$curse", "$$wwwzz"] }}},
                  { "$lookup": {
                    "from": "c1",
                    "let": { "wwz": "$_id" },
                    "pipeline": [
                      { "$match": { "$expr": { $and:
                        [ {"$eq": ["$identificadortema", "$$wwz"] }, {"$eq": ["$user", ObjectId("6012efd01b88072968db043e")] }] 
                      }}},
                    ], 
                    "as": "comments"
                  }},
                  { "$lookup": {
                                "from": "c1",
                                "let": { "wrw": "$_id" },
                                "pipeline": [
                                  { "$match": { "$expr": { $and:
                                    [ {"$eq": ["$identificadortema", "$$wrw"] }, {"$eq": ["$user", ObjectId("6012efd01b88072968db043e")] }] 
                                  }}},
                                  {
                                    $group : {
                                        _id : '$identificadortema',
                                        conteo : {$sum : 1}, 
                                        totalCalification : {$sum : { $sum : ['$calification', '$fee']}}, 
                                        averageCalification : {$avg : { $sum : ['$calification', '$fee']}}
                                    }
                                  }
                                ], 
                                "as": "resulthemes"
                }},
                ], 
                "as": "themes"
      }},
]).pretty()
   
///////////
db.tests.aggregate([
      {
        $match: {
          foreign: ObjectId("604046d18e648315785b413c")
        },
      },
]).pretty()

///////////

db.c1.aggregate([
  {
  $lookup: {
      from: "c1",
      let: { ww: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$foreign", "$$ww"] } } },
      ],
      as: "c2",
    },
  },
  {
    $lookup: {
      from: "c3",
      let: { www: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$foreign", "$$www"] } } },
      ],
      as: "c3",
    },
  },
  
]).pretty()

///////////
db.curses.aggregate([
    {
      $match: {
        _id: ObjectId("60386686f41efd29a0da883d"),
      },
    },
      { "$lookup": {
        "from": "chapters",
        "let": { "ww": "$_id" },
        "pipeline": [
          { "$match": { "$expr": { "$eq": ["$curse", "$$ww"] }}},
          { "$lookup": {
            "from": "seccions",
            "let": { "www": "$_id" },
            "pipeline": [
              { "$match": { "$expr": { "$eq": ["$chapter", "$$www"] }}},
              { "$lookup": {
                "from": "tasks",
                "let": { "wwz": "$_id" },
                "pipeline": [
                  { "$match": { "$expr": { $and:
                    [ {"$eq": ["$section", "$$wwz"] }, {"$eq": ["$user", ObjectId("6012efd01b88072968db043e")] }] 
                  }}},
                ], 
                "as": "tasks"
              }}
            ], 
            "as": "sec"
          }},
      { "$lookup": {
                "from": "tests",
                "let": { "wwwz": "$_id" },
                "pipeline": [
                  { "$match": { "$expr": { "$eq": ["$foreign", "$$wwwz"] }}},
                ], 
                "as": "tests"
              }}
        ],
        "as": "capitulos"
      }},
      { "$lookup": {
                "from": "tests",
                "let": { "wwwzz": "$_id" },
                "pipeline": [
                  { "$match": { "$expr": { "$eq": ["$foreign", "$$wwwzz"] }}},
                ], 
                "as": "chptests"
              }},
      { "$lookup": {
                "from": "themes",
                "let": { "wwzw": "$_id" },
                "pipeline": [
                  { "$match": { "$expr": { "$eq": ["$curse", "$$wwzw"] }}}, 
                  { "$lookup": {
                    "from": "c1",
                    "let": { "wrw": "$_id" },
                    "pipeline": [
                      { "$match": { "$expr": { $and:
                        [ {"$eq": ["$identificadortema", "$$wrw"] }, {"$eq": ["$user", ObjectId("60132a88faebf824b455a1c9")] }] 
                      }}},
                    ], 
                    "as": "comments"
                  }}
                ], 
                "as": "themes"
              }}
]).pretty() 
/////////////

db.themes.aggregate([
    {
      $match: {
        _id: ObjectId("60387ed0dcc49421985a8e1b"),
      },
    },
    {
      $lookup: {
        from: "c1",
        let: { cw: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$theme", "$$cw"] } } },
          {
            $lookup: {
              from: "c1",
              let: { cww: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$foreign", "$$cww"] } } },
                {
                  $lookup: {
                    from: "c1",
                    let: { cwww: "$_id" },
                    pipeline: [
                      { $match: { $expr: { $eq: ["$foreign", "$$cwww"] } } },
                      {
                        $lookup: {
                          from: "c1",
                          let: { c4: "$_id" },
                          pipeline: [
                            {
                              $match: {
                                $expr: { $eq: ["$foreign", "$$c4"] },
                              },
                            },
                            {
                              $lookup: {
                                from: "c1",
                                let: { c5: "$_id" },
                                pipeline: [
                                  {
                                    $match: {
                                      $expr: { $eq: ["$foreign", "$$c5"] },
                                    },
                                  },
                                ],
                                as: "c5",
                              },
                            },
                          ],
                          as: "c4",
                        },
                      },
                    ],
                    as: "c3",
                  },
                },
              ],
              as: "c2",
            },
          },
        ],
        as: "c1",
      },
    },
    { "$lookup": {
                    "from": "c1",
                    "let": { "wrw": "$_id" },
                    "pipeline": [
                      { "$match": { "$expr": { $and:
                        [ {"$eq": ["$identificadortema", "$$wrw"] }, {"$eq": ["$user", ObjectId("60132a88faebf824b455a1c9")] }] 
                      }}},
                    ], 
                    "as": "comments"
    }},
    { "$lookup": {
                    "from": "c1",
                    "let": { "wrw": "$_id" },
                    "pipeline": [
                      { "$match": { "$expr": { $and:
                        [ {"$eq": ["$identificadortema", "$$wrw"] }, {"$eq": ["$user", ObjectId("60132a88faebf824b455a1c9")] }] 
                      }}},
                      {
                        $group : {
                            _id : '$identificadortema',
                            conteo : {$sum : 1}, 
                            totalCalification : {$sum : { $sum : ['$calification', '$fee']}}, 
                            averageCalification : {$avg : { $sum : ['$calification', '$fee']}}
                        }
                      }
                    ], 
                    "as": "result"
    }},
  ]).pretty()
  https://us04web.zoom.us/j/7976228238?pwd=b3ZJQTBBaFBRdUU5anhJa1lYOTNOdz09
  Unirse a la reunión Zoom
https://us04web.zoom.us/j/7976228238?pwd=b3ZJQTBBaFBRdUU5anhJa1lYOTNOdz09

ID de reunión: 797 622 8238
Código de acceso: 8CWpTx




  /////////////////////////////
  db.tests.aggregate([
    {
        $match: {
          _id: ObjectId("60414df09bbfb910b035c4a9"),
        },
      },
    { "$lookup": {
      "from": "testresps",
      "let": { "w": "$_id" },
      "pipeline": [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$foreign', '$$w'] },
                { $eq: ['$user', ObjectId("60132a88faebf824b455a1c9")] },
              ]
            }
          }
        }
        
      ],
      "as": "resp"
    }},
  ]).pretty()


///////////////////////////

db.chapters.aggregate([
    {
      $match: {
        curse: ObjectId("602701954f46390b4cce5c2f"),
      },
    },
    {$lookup: {
        from: 'seccions',
        localField: '_id',
        foreignField: 'chapter',
        as: 'sect'
    }},
    {$lookup: {
        from: 'tasks',
        localField: 'sect._id',
        foreignField: 'section',
        as: 'task'
    }},  
]).pretty()
///////////////////////////

db.chapters.aggregate([
    {
      $match: {
        curse: ObjectId("602701954f46390b4cce5c2f"),
      },
    },
    {$lookup: {
        from: 'seccions',
        localField: '_id',
        foreignField: 'chapter',
        as: 'questions'
    }},
    {$unwind: {
        path: "$questions",
        preserveNullAndEmptyArrays: true
    }},
    {$lookup: {
        from: 'tasks',
        localField: 'questions._id',
        foreignField: 'section',
        as: 'options'
    }},
  
    {$group: {
        _id: "$_id",
        nombre: {$first: "$nombre"},
        question: {$push: {
            _id: "$questions._id",
            c_id: "$questions.category",
            nombre: "$questions.nombre",
            contenido: "$questions.contenido",
            options: "$options"
        }}
    }}
]).pretty()




  db.categories.aggregate([
    { $match: { _id: 'administrator' } },
    {
      $lookup: {
        from: 'curses',
        as: 'Company',
        let: { CompanyID: '$CompanyID' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$CompanyID', '$$CompanyID'] },
                  { $eq: ['$CompanyName', 'edt5'] },
                ]
              }
            }
          }
        ]
      }
    },
  ])
  
  ///////////////////////////////////////////////////categoria cursos y usuario
  db.categories.aggregate([
    {
    $lookup: {
      from: "curses",
        let: { ww: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$category", "$$ww"] } } },
          {
          $lookup: {
            from: "mycurses",
            let: { wwz: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$curse", "$$wwz"] },
                      {
                        $eq: [
                          "$user",
                           ObjectId("6012efd01b88072968db043e"),
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            as: "mycurse",
          },
        },
        ],
        as: "curse",
      },
    },
  ]).pretty()
  //////////////////////////////////// usuarios =>curso
  db.c1.aggregate([
  {
  $lookup: {
      from: "c2",
      let: { ww: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$foreign", "$$ww"] } } },
      ],
      as: "c2",
    },
  },
  {
    $lookup: {
      from: "c3",
      let: { www: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$foreign", "$$www"] } } },
      ],
      as: "c3",
    },
  },
  
]).pretty()


db.c1.aggregate([
{ $merge : { into : "c1" } }
] );

db.c1.aggregate([ {
$group: {
  _id: '$user',
  Cantidad : {$sum : 1},
  "Totalnota": { $sum: "$calification" }
}
} ] );

db.c1.aggregate([
       { $unionWith: "c2" },
       { $unionWith: "c3" },
       { $unionWith: "c4" },
       { $unionWith: "c5" },
       { $group: { _id: "$user", ww: { $sum: "$calification" }, www: { $sum: 1 }, w: { $avg: "$calification" } } },
     ]).pretty();

db.mycurses.aggregate([
        { $match: { curse: ObjectId("602701954f46390b4cce5c2f") } },
        {
          $lookup: {
            from: "users",
            let: { ww: "$user" },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$ww"] } } }],
            as: "cursew",
          },
        },
      ]).pretty()

  */