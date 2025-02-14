class StorageManager {
    static STORAGE_KEY = 'flappyMonkeyLove';

    static getInitialData() {
        return {
            highScore: 0,
            rewards: {
                normal: 0,
                silver: 0,
                gold: 0
            }
        };
    }

    static getData() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : this.getInitialData();
    }

    static saveData(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }

    static updateHighScore(score) {
        const data = this.getData();
        if (score > data.highScore) {
            data.highScore = score;
            this.saveData(data);
            return true;
        }
        return false;
    }

    static addReward(type) {
        const data = this.getData();
        data.rewards[type]++;
        this.saveData(data);
    }

    static useReward(type) {
        const data = this.getData();
        if (data.rewards[type] > 0) {
            data.rewards[type]--;
            this.saveData(data);
            return true;
        }
        return false;
    }
}