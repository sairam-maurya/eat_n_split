import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
    const [bill, setBill] = useState("");
    const [paidByUser, setPaidByUser] = useState("");
    const paidByFriend = bill ? bill - paidByUser : "";
    const [whoIsPaying, setWhoIsPaying] = useState("user");

    function handelSubmit(e) {
        e.preventDefault();
        if (!bill || !paidByUser) return;
        onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
    }

    return (
        <form className="form-split-bill" onSubmit={handelSubmit}>
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label> 💸Bill value </label>
            <input
                type="text"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
            />

            <label> 😃Your Expense </label>
            <input
                type="text"
                value={paidByUser}
                onChange={(e) =>
                    setPaidByUser(
                        Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
                    )
                }
            />

            <label> 👩🏾‍🤝‍👩🏽{selectedFriend.name} expense </label>
            <input type="text" disabled value={paidByFriend} />
            <label>🤑Who is paying the bill</label>
            <select
                value={whoIsPaying}
                onChange={(e) => setWhoIsPaying(e.target.value)}
            >
                <option value="user">You</option>
                <option value="Friend">{selectedFriend.name}</option>
            </select>
            <Button>Split Bill</Button>
        </form>
    );
}