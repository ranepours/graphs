class Node{
    constructor(val, adjacent = new Set()){
        this.val = val;
        this.adjacent = adjacent;
    }
}

class Graph{
    constructor(){
        this.nodes = new Set();
    }

    addVertex(vertex){
        this.nodes.add(vertex);
    }

    addVertices(vertArr){
        for(let vertex of vertArr){
            this.addVertex(vertex);
        }
    }

    addEdge(v1,v2){
        v1.adjacent.add(v2);
        v2.adjacent.add(v1);
    }

    removeEdge(v1,v2){
        v1.adjacent.delete(v2);
        v2.adjacent.delete(v1);
    }

    removeVertex(vertex){
        for(let node of this.nodes){
            if(node.adjacent.has(vertex)){
                node.adjacent.delete(vertex);
            }
        } this.nodes.delete(vertex);
    }

    DFS(start){
        const visited = new Set();
        const res = [];

        function traverse(vertex){
            if (!vertex){
                return null;
            }

            visited.add(vertex);
            res.push(vertex.value);

            vertex.adjacent.forEach(neighbor => {
                if (!visited.has(neighbor)){
                    return traverse(neighbor);
                }
            })
        } traverse(start);
        return res;
    }

    DFSIterative(start){
        const stack = [start];
        const res = [];
        const visited = new Search();
        let currVert;

        visited.add(start);

        while(stack.length){
            currVert = stack.pop();
            res.push(currVert.val);
            
            currVert.adjacent.forEach(neighbor => {
                if (!visited.has(neighbor)){
                    visited.add(neighbor);
                    stack.push(neighbor);
                }
            })
        } return res;
    }

    BFS(start){
        const queue = [start];
        const res = [];
        const visited = new Set();
        let currVert;

        visited.add(start);

        while(queue.length){
            currVert = queue.shift();
            res.push(currVert.val);

            currVert.adjacent.forEach(neighbor => {
                if(!visited.has(neighbor)){
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            })
        } return res;
    }

    shortest(start,end){
        if(start === end){
            return [start.val];
        }

        let queue = [start];
        let visited = new Set();
        let ancestors = {};
        let path = [];

        while(queue.length){
            let currVert = queue.shift();

            if (currVert === end){
                let stop = ancestors[end.val];
                while (stop){
                    path.push(stop);
                    stop = ancestors[stop];
                }
                path.unshift(start.val);
                path.reverse();
                return path;
            }

            visited.add(currVert);
            for (let vert of currVert.adjacent){
                if (!visited.has(vert)){
                    ancestors[vert.val] = currVert.val;
                    queue.push(vert);
                }
            }
        }
    }
}