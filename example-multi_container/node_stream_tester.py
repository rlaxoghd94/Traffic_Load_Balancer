# importing the requests library 
import requests 
  
# api-endpoint 
URL = "http://0.0.0.0:8900"
  
# sending get request and saving the response as response object 
for i in range (0, 10000):
    r = requests.get(url = URL)
    print(r.text)

print('\nLoop Finished!\n')

