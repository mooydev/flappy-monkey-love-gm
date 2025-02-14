class RewardManager{
    static REWARDS = {
        normal: { score: 8, name: 'Normal' },
        silver: { score: 16, name: 'Plata' },
        gold: { score: 20, name: 'Oro' }
    };

    constructor(game) {
        this.game = game;
        this.earnedRewards = new Set();
        this.rewardPanel = new RewardPanel(this);
    }

    checkRewards(score) {
        Object.entries(RewardManager.REWARDS).forEach(([type, data]) => {
            if (score >= data.score && !this.earnedRewards.has(type)) {
                this.earnedRewards.add(type);
                StorageManager.addReward(type);
                this.showRewardNotification(type);
            }
        });
    }

    showRewardNotification(type) {
        const rewardData = RewardManager.REWARDS[type];
        const notification = document.createElement('div');
        notification.className = `reward-notification ${type}`;
        notification.textContent = `¡Ganaste un vale ${rewardData.name}!`;
        this.game.gameContainer.appendChild(notification);
        this.rewardPanel.updatePanel();
        
        setTimeout(() => notification.remove(), 3000);
        playSound('reward');
    }

    reset() {
        this.earnedRewards.clear();
    }
}