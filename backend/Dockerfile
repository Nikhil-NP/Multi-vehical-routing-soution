#base image
FROM node:18-slim

#installing python,pip,venv
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*


#working dir
WORKDIR /app


#copying the metadata file
COPY package*.json ./



#installing the node depednencies
RUN npm install


COPY tsconfig.json  ./

COPY route_solver.py  ./
COPY types.ts ./
COPY server.ts ./


#build it 
RUN npm run build

#venv setup and install or-tools
RUN python3 -m  venv venv  &&\
    . venv/bin/activate && \
    pip install --no-cache-dir ortools



EXPOSE 8080

#start the server
CMD [ "npm", "start" ]
