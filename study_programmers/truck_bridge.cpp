#include <iostream>

#include <string>
#include <vector>
#include <queue>

using namespace std;

typedef struct truckInfo_ {
    int weight;
    int time;
} truckInfo, *pTruckInfo;

class bridge {
private:
    queue<pTruckInfo> q;
    int mTime = 0;
    int mWeight = 0;
    int bWeight = 0;
    int bLength = 0;
public:
    bridge(int w, int l) {
        bWeight = w;
        bLength = l;
    }
    int getTime() {
        return mTime;
    }
    int getSize() {
        return q.size();
    }
    void pop() {
        pTruckInfo truck = q.front();
        mWeight -= truck->weight;
        q.pop();
        delete truck;
        if (q.size()) {
            truck = q.front();
            mTime = truck->time;
        }
    }
    void push(pTruckInfo truck) {
        if (q.empty()) {
            mTime = truck->time;
        }
        mWeight += truck->weight;
        q.push(truck);
    }
    bool lengthCheck() {
        return (q.size() < bLength);
    }
    bool weightCheck(int w) {
        if (bWeight - (mWeight + w) >= 0) {
            return true;
        }
        return false;
    }
};

int solution(int bridge_length, int weight, vector<int> truck_weights) {
    int answer = 0;

    bridge b(weight, bridge_length);
    int sec = 0;
    int truckNum = 0;

    while ((truckNum < truck_weights.size()) || b.getSize()) {
        sec++;
        if (b.getTime() == sec) { // pop check
            b.pop();
        }

        if ((truckNum < truck_weights.size())) {
            if (b.lengthCheck() && b.weightCheck(truck_weights[truckNum])) { // push check
                pTruckInfo truck = new truckInfo();
                truck->time = sec + bridge_length;
                truck->weight = truck_weights[truckNum];
                b.push(truck);
                truckNum++;
            }
        }
    }
    answer = sec;
    return answer;
}

void truck_bridge() {
    //vector<int> truck_weights = { 7,4,5,6 };
    vector<int> truck_weights = { 10 };

    int bridge_length = 100;
    int weight = 100;

    std::cout << solution(bridge_length, weight, truck_weights) << "\n";
}