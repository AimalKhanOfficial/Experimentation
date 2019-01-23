-----Description of Steps involved in this Set up (Docker File):------

-----------
FROM nginx    				Downloading base image, nginx in this case!
----------- 
-------------------------------------
ADD index.html /usr/share/nginx/html    Copy (mount) the index.html to the user/share/nginx/html folder where nginx needs 
-------------------------------------
					an index.html to show.
---------
EXPOSE 80				Expose the port 80 from with in the running container 
---------


-----How to run this Docker file:------

We need two commands to run this. (Note: navigate to the directory where these files are located. i.e. cd ..//..//filename)

[1] docker build -t aimal-nginx .
[2] docker run -p 8084:80 aimal-nginx

- The first command goes through the lines specified in DockerFile and builds required containers/images. It also tags it     as aimal-nginx
- The next instruction runs the container which was built and tagged as aimal-nginx. It also maps the internal port 80 of 
  container to 8084 of host OS (we can access the site by <docker_machine_ip>:8084. In my case the default IP is   192.168.99.100)

