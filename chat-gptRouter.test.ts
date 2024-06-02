import request from 'supertest';
import server from '../router/chat_gptRouter';

describe('POST /user',  () => {
    test('Inicio de llamada sin thread creado', async () => {
      
    try { 
      const response = await request(server) 
      .post('/modelo/v1')
      .set("content-type", "application/json")
      .set("Autorization", "")
      .set('OpenAi-Beta', 'assistants=v2')
      .set('OpenAI-Session', 'null')
      .send({
        
            "model": "gpt-4-turbo",
            "messages": [
              {
                "role": "system",
                "content": "You are a helpful assistant."
              },
              {
                "role": "user",
                "content": "dime hola"
              }
              
            ]
           
          
      })
       
     
      expect(response.status).toEqual(200);
    }catch (err) {
      console.log("------ERROR--------")
      console.log(err);
    }
      
    })


    test('sin mandar las cabeceras toca devolver un 400', async () => {
      
        try { 
          const response = await request(server) 
          .post('/modelo/v1')
          .set("content-type", "application/json")
          .set("Autorization", "")
          .set('OpenAI-Session', 'null')
          .send({
            
                "model": "gpt-4-turbo",
                "messages": [
                  {
                    "role": "system",
                    "content": "You are a helpful assistant."
                  },
                  {
                    "role": "user",
                    "content": "dime hola"
                  }
                  
                ]
               
              
          })
           
         
          expect(response.status).toEqual(400);
        }catch (err) {
          console.log("------ERROR--------")
          console.log(err);
        }
          
        })
    
        test('Inicio de llamada con un thread', async () => {
      
            try { 
              const response = await request(server) 
              .post('/modelo/v1')
              .set("content-type", "application/json")
              .set("Autorization", "")
              .set('OpenAi-Beta', 'assistants=v2')
              .set('OpenAI-Session', 'thread_76CdPARr44YDMymDkI9c7ek4')
              .send({
                
                    "model": "gpt-4-turbo",
                    "messages": [
                      {
                        "role": "system",
                        "content": "You are a helpful assistant."
                      },
                      {
                        "role": "user",
                        "content": "dime hola"
                      }
                      
                    ]
                   
                  
              })
               
             
              expect(response.status).toEqual(200);
            }catch (err) {
              console.log("------ERROR--------")
              console.log(err);
            }
              
            })


            test('sin mandar el cuerpo es incorrecto  toca devolver un 400', async () => {
      
                try { 
                  const response = await request(server) 
                  .post('/modelo/v1')
                  .set("content-type", "application/json")
                  .set("Autorization", "")
                  .set('OpenAi-Beta', 'assistants=v2')
                  .set('OpenAI-Session', 'null')
                  .send({
                    
                       
                        "messages": [
                          {
                            "role": "system",
                            "content": "You are a helpful assistant."
                          },
                          {
                            "role": "user",
                            "content": "dime hola"
                          }
                          
                        ]
                       
                      
                  })
                   
                 
                  expect(response.status).toEqual(400);
                }catch (err) {
                  console.log("------ERROR--------")
                  console.log(err);
                }
                  
                })


                test('sin mandar el cuerpo es incorrecto  toca devolver un 401', async () => {
      
                    try { 
                      const response = await request(server) 
                      .post('/modelo/v1')
                      .set("content-type", "application/json")
                      
                      .set('OpenAi-Beta', 'assistants=v2')
                      .set('OpenAI-Session', 'null')
                      .send({
                        
                           
                            "messages": [
                              {
                                "role": "system",
                                "content": "You are a helpful assistant."
                              },
                              {
                                "role": "user",
                                "content": "dime hola"
                              }
                              
                            ]
                           
                          
                      })
                       
                     
                      expect(response.status).toEqual(401);
                    }catch (err) {
                      console.log("------ERROR--------")
                      console.log(err);
                    }
                      
                    })
        
    
        })
    
     
      
    