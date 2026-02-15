import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getPendingInvites, acceptCircleInvite, rejectCircleInvite } from '../api/circleApi';

interface CircleInvite {
    _id: string;
    name: string;
    ownerId: {
        _id: string;
        name: string;
        username: string;
    };
    members: {
        _id: string;
        name: string;
    }[];
}

export default function CircleRequestsScreen() {
    const [invites, setInvites] = useState<CircleInvite[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchInvites = async () => {
        try {
            console.log('Fetching pending invites...');
            const data = await getPendingInvites();
            console.log('Invites fetched:', JSON.stringify(data, null, 2));
            setInvites(data);
        } catch (error: any) {
            console.error('Error fetching invites:', error);
            Alert.alert('Error', error.message || 'Failed to fetch invites');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvites();
    }, []);

    const handleAccept = async (circleId: string) => {
        try {
            await acceptCircleInvite(circleId);
            Alert.alert('Success', 'You have joined the circle!');
            fetchInvites(); // Refresh list
        } catch (error: any) {
            console.error('Error accepting invite:', error);
            Alert.alert('Error', error.message || 'Failed to accept invite');
        }
    };

    const handleReject = async (circleId: string) => {
        try {
            await rejectCircleInvite(circleId);
            Alert.alert('Rejected', 'Invite rejected.');
            fetchInvites(); // Refresh list
        } catch (error: any) {
            console.error('Error rejecting invite:', error);
            Alert.alert('Error', error.message || 'Failed to reject invite');
        }
    };

    const renderItem = ({ item }: { item: CircleInvite }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.circleName}>{item.name}</Text>
                <Text style={styles.ownerText}>Invited by @{item.ownerId?.username}</Text>
            </View>
            <Text style={styles.membersText}>{item.members.length} members</Text>

            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={[styles.button, styles.rejectButton]}
                    onPress={() => handleReject(item._id)}
                >
                    <Text style={styles.rejectButtonText}>Reject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.acceptButton]}
                    onPress={() => handleAccept(item._id)}
                >
                    <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Circle Invites</Text>
            </View>

            {invites.length === 0 ? (
                <View style={styles.centered}>
                    <Text style={styles.emptyText}>No pending invites</Text>
                </View>
            ) : (
                <FlatList
                    data={invites}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
        paddingTop: 50, // Safe area
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        marginBottom: 8,
    },
    circleName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    ownerText: {
        fontSize: 14,
        color: '#666',
    },
    membersText: {
        fontSize: 14,
        color: '#8E8E93',
        marginBottom: 16,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    acceptButton: {
        backgroundColor: '#007AFF',
    },
    rejectButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#FF3B30',
    },
    acceptButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    rejectButtonText: {
        color: '#FF3B30',
        fontWeight: '600',
        fontSize: 16,
    },
    emptyText: {
        fontSize: 16,
        color: '#8E8E93',
    },
});
