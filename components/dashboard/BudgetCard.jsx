import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from './variants';
import { Plus } from 'lucide-react';

const BudgetCard = ({ budget = 0, spent = 0, onBudgetSet }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState('');
  const [loading, setLoading] = useState(false);

  // If budget exists, we show stats
  const hasBudget = budget > 0;
  const remaining = Math.max(0, budget - spent);
  const percentage = Math.min(100, (spent / budget) * 100);

  const handleSetBudget = async () => {
    const budgetValue = parseFloat(newBudget);
    
    // Validate: must be a positive number within reasonable limits
    if (isNaN(budgetValue) || budgetValue <= 0 || budgetValue > 100000000) {
      return; // Silently reject invalid input (could add error state for UX)
    }
    
    setLoading(true);
    await onBudgetSet(budgetValue); // Send as number, not string
    setLoading(false);
    setIsEditing(false);
  };

  const startEditing = () => {
      setNewBudget(budget || '');
      setIsEditing(true);
  }

  // Render "Add Budget" mode or "Edit Mode"
  if (!hasBudget || isEditing) {
    return (
      <motion.div variants={itemVariants} className="bg-[#D8EFA8] p-5 rounded-3xl text-[#0A0A0A] relative overflow-hidden">
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">Monthly Budget</h3>
            {hasBudget && <button onClick={() => setIsEditing(false)} className="text-xs underline opacity-60 hover:opacity-100">Cancel</button>}
        </div>
        
        {!isEditing && !hasBudget ? (
             <button 
                onClick={() => setIsEditing(true)}
                className="w-full py-3 bg-[#0A0A0A] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-black/80 transition-colors"
             >
                <Plus size={18} /> Set Budget
             </button>
        ) : (
            <div className="flex flex-col gap-2">
                <input 
                    type="number" 
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    max="100000000"
                    className="w-full bg-white/50 border border-black/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-black/30 placeholder:text-black/30 placeholder:font-normal font-bold"
                    autoFocus
                />
                <button 
                    onClick={handleSetBudget}
                    disabled={loading}
                    className="w-full py-2 bg-[#0A0A0A] text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                >
                    {loading ? 'Saving...' : 'Set Budget'}
                </button>
            </div>
        )}
      </motion.div>
    );
  }

  // Render "Budget Status" mode
  return (
    <motion.div variants={itemVariants} className="bg-[#D8EFA8] p-5 rounded-3xl text-[#0A0A0A] relative group">
        <div className="flex justify-between items-start">
             <div>
                <p className="text-[#0A0A0A]/70 text-xs mb-1 font-medium">Left to spend</p>
                <h3 className="text-3xl font-bold">₹{remaining.toLocaleString()}</h3>
             </div>
             <button onClick={startEditing} className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-black/10 px-2 py-1 rounded hover:bg-black/20">Edit</button>
        </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-xs font-medium mb-1 opacity-70">
            <span>Spent: ₹{spent.toLocaleString()}</span>
            <span>Limit: ₹{budget.toLocaleString()}</span>
        </div>
        <div className="h-2 w-full bg-[#0A0A0A]/10 rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                className={`h-full ${percentage > 90 ? 'bg-red-500' : 'bg-[#0A0A0A]'}`}
            />
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetCard;